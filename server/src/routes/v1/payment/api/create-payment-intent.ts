import type { Router } from 'express';
import { z } from 'zod';

import ValidationLib from '../../../../libs/Validation';
import ErrorsLib from '../../../../libs/Errors';
import { db, orm, schema } from '../../../../db/libs/Database';
import StripeService from '../../../../services/Stripe';
import { withAccessTokenVerification } from '../../../../middlewares';
import errorCodes from '../../../../static/error-codes';

const stripeService = new StripeService();

const validationSchema = z.object({
  paymentMethodId: z.string(),
});

export default function (app: Router) {
  app
    .route('/create-payment-intent')
    .post(withAccessTokenVerification(), async function (req, res) {
      const [isValid, response] = ValidationLib.validateSchema(
        req.body,
        validationSchema,
      );

      if (!isValid) {
        return res.status(400).json(response);
      }

      const sessionUser = res.locals.middlewares?.withAccessTokenVerification;

      const { paymentMethodId } = response as z.infer<typeof validationSchema>;

      try {
        const [user] = await db
          .select({
            user: { id: schema.user.id },
            credential: {
              id: schema.credential.id,
              stripeId: schema.credential.stripeId,
              email: schema.credential.email,
            },
          })
          .from(schema.user)
          .innerJoin(
            schema.credential,
            orm.eq(schema.user.credentialId, schema.credential.id),
          )
          .where((user) => orm.eq(user.user.id, sessionUser?.user?.id));

        if (user == null) {
          return res.status(404).json({
            success: false,
            message: 'User not found.',
            code: errorCodes.USER_NOT_FOUND,
          });
        }

        const [customerId, { isNewCustomer }] =
          await stripeService.getOrCreateStripeIdOfAUser(user.user.id, {
            email: user.credential.email!,
            paymentMethodId: paymentMethodId,
            metadata: {
              userId: user.user.id,
            },
          });

        if (!isNewCustomer) {
          await stripeService.attachDefaultPaymentMethod(
            paymentMethodId,
            customerId,
          );
        }

        const subscriptionProductId = 'prod_OmQYtvYYg7CvV0';

        const subscription = await stripeService.createSubscription(
          customerId,
          // [{ price: subscriptionPriceId }], // Fixed price subscription for a product
          [
            {
              price_data: {
                currency: 'USD',
                product: subscriptionProductId,
                unit_amount: 100 * 100,
                recurring: { interval: 'day', interval_count: 1 },
              },
            },
          ], // Changed price subscription for a product. (For example, if you want to apply discounts to user.)
          {
            paymentMethodId: paymentMethodId,
            amountInDollar: 69,
            metadata: {
              userId: user.user.id,
            },
          },
        );
        return res.json({
          success: true,
          data: {
            subscriptionId: subscription.id,
            customerId: customerId,
            clientSecret: subscription.clientSecret,
            subtotal: subscription.subtotal,
            total: subscription.total,
            tax: subscription.tax,
            ephemeralKey: subscription.ephemeralKey,
          },
        });
      } catch (error) {
        return res.status(500).json(ErrorsLib.catchException(error));
      }
    });
}
