import 'dotenv/config';
import StripeCore from 'stripe';

import { db, orm, schema } from '../db/libs/Database';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;

const stripe = new StripeCore(STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
  typescript: true,
});

interface DefaultOptions {
  createCustomer: {
    email: string;
    paymentMethod: string;
    name?: string;
    metadata?: StripeCore.MetadataParam;
  };
}
// const defaultOptions: DefaultOptions = {
//   createCustomer: {
//     email: '',
//     name: undefined,
//     metadata: {},
//   },
// };

class Stripe_ {
  async getOrCreateStripeIdOfAUser(
    userId: number,
    customerToCreate: DefaultOptions['createCustomer'],
  ): Promise<string> {
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
      return stripeId;
    }
    const customer = await this.createCustomer(customerToCreate);

    await db.update(schema.credential).set({
      stripeId: customer.id,
    });

    return customer.id;
  }
  getSubscription(id: string) {
    if (id == null) {
      throw new Error('Subscription id is required.');
    }
    return stripe.subscriptions.retrieve(id);
  }

  createCustomer(options: DefaultOptions['createCustomer']) {
    return stripe.customers.create({
      email: options.email,
      name: options.name ?? '',
      metadata: options.metadata,
    });
  }
}

export default Stripe_;
