import 'dotenv/config';
import StripeCore from 'stripe';

import { db, orm, schema } from '../db/libs/Database';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;

const stripe = new StripeCore(STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
  typescript: true,
});

interface CreateSubscriptionParams {
  paymentMethodId: string;
  amountInDollar: number;
  metadata?: StripeCore.MetadataParam;
  currency?: 'USD';
}

interface CreateSubscriptionDiscountParams {
  shouldApplyDiscount: true;
  discountValue: number;
  discountType: 'percentage' | 'absolute';
}

interface DefaultOptions {
  createCustomer: {
    email: string;
    paymentMethodId?: string;
    name?: string;
    metadata?: StripeCore.MetadataParam;
  };

  createSubscription:
    | (CreateSubscriptionParams & { shouldApplyDiscount?: false })
    | (CreateSubscriptionParams & CreateSubscriptionDiscountParams);
}

class Stripe {
  // PaymentSettings.PaymentMethodType
  static availablePaymentMethods: StripeCore.SubscriptionCreateParams.PaymentSettings.PaymentMethodType[] =
    ['card'];

  async getOrCreateStripeIdOfAUser(
    userId: number,
    customerToCreate: DefaultOptions['createCustomer'],
  ): Promise<[string, { isNewCustomer: boolean }]> {
    const [user] = await db
      .select()
      .from(schema.user)
      .innerJoin(
        schema.credential,
        orm.eq(schema.user.id, schema.credential.id),
      )
      .where((user) => orm.eq(user.user.id, userId));

    if (user == null) {
      throw new Error('User not found.');
    }
    const stripeId = user.credential.stripeId;
    if (!(stripeId == null)) {
      return [stripeId, { isNewCustomer: false }];
    }
    const customer = await this.createCustomer(customerToCreate);

    await db.update(schema.credential).set({
      stripeId: customer.id,
    });

    return [customer.id, { isNewCustomer: true }];
  }

  createCustomer(options: DefaultOptions['createCustomer']) {
    return stripe.customers.create({
      email: options.email,
      ...(options.name ? { name: options.name } : {}),
      ...(options.metadata ? { metadata: options.metadata } : {}),
    });
  }

  attachDefaultPaymentMethod(paymentMethodId: string, customerId: string) {
    return stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
  }

  getSubscription(id: string) {
    if (id == null) {
      throw new Error('Subscription id is required.');
    }
    return stripe.subscriptions.retrieve(id);
  }

  async createSubscription(
    customerId: string,
    items: StripeCore.SubscriptionCreateParams.Item[],
    options: DefaultOptions['createSubscription'],
  ) {
    // Subscription Price is inclusive of tax
    const amountIncludingTax = await this.finalAmountIncludingTax(
      options.amountInDollar,
    );
    const tax = amountIncludingTax - options.amountInDollar * 100;
    const amount = options.amountInDollar * 100;
    const subtotal = amount - tax;

    const ephemeralKey = await stripe.ephemeralKeys.create(
      {
        customer: customerId,
      },
      { apiVersion: '2020-08-27' },
    );

    const discountAmount = options.shouldApplyDiscount
      ? options.discountType === 'percentage'
        ? Math.ceil((options.discountValue * amount) / 100)
        : Math.ceil(options.discountValue)
      : amount;

    const finalAmount =
      options.shouldApplyDiscount && typeof options.discountValue === 'number'
        ? amount - discountAmount
        : amount;

    const intent = await stripe.subscriptions.create({
      customer: customerId,
      currency: options.currency,
      items,
      payment_settings: {
        payment_method_types: Stripe.availablePaymentMethods,
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      payment_behavior: 'default_incomplete', // default_incomplete =  When you don't want to charge immediately. Remove this field if you want to charge immediately.
      default_payment_method: options.paymentMethodId,
      metadata: {
        createdAt: new Date().toISOString(),
        total: finalAmount, // Cents
        subtotal, // Cents
        tax, // Cents
        isDiscounted: `${options.shouldApplyDiscount ?? false}`,
        ...(options.shouldApplyDiscount
          ? {
              discountValue: options.discountValue,
              discountType: options.discountType,
              totalWithoutDiscount: amount,
              discountAmount,
            }
          : {}),
        ...options.metadata,
      },
    });

    return {
      id: intent?.id,
      clientSecret:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        intent?.latest_invoice?.payment_intent?.client_secret,
      total: finalAmount, // Cents
      tax: amount - options.amountInDollar * 100, // Cents
      subtotal: options.amountInDollar * 100, // Cents
      ephemeralKey: ephemeralKey.secret,
      isDiscounted: options.shouldApplyDiscount ?? false,
      totalWithoutDiscount: amount,
      discountAmount,
    };
  }

  async finalAmountIncludingTax(amountInDollar: number) {
    const taxPercentile = 2.7;
    const perTransactionInCents = 30;

    const amountInDollarIncludingTax =
      +amountInDollar +
      (taxPercentile * amountInDollar) / 100 +
      perTransactionInCents / 100;

    return Math.ceil(amountInDollarIncludingTax * 100); // Stripe will throw error if cents have decimals in them. 311 = Right, 311.12 = Wrong
  }
}

export default Stripe;
