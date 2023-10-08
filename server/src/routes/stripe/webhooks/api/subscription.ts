// Setup the function of this webhook in queue(bullMQ) to manage load

import type { Router } from 'express';
import express from 'express';
import 'dotenv/config';
import StripeCore from 'stripe';
import fs from 'fs';
import path from 'path';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;

const stripe = new StripeCore(STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
  typescript: true,
});

const endpointSecret =
  'whsec_ac0b24fffb629069cbc50857190fc2733fc925e007137467724de4dfbc5a8497';

export default function subscription(app: Router) {
  app
    .route('/subscription')
    .post(express.raw({ type: 'application/json' }), function (req, res) {
      console.log('\x1b[32m%s\x1b[0m', 'Webhook called', req.headers, req.body);

      const content = fs.readFileSync(
        path.join(__dirname, './webhook.log.txt'),
        'utf-8',
      );
      fs.writeFileSync(
        path.join(__dirname, './webhook.log.txt'),
        `${JSON.stringify(
          { headers: req.headers, body: req.body },
          null,
          2,
        )}\n\n\n\n\n\n${content}`,
        { encoding: 'utf-8' },
      );

      const sig = req.headers['stripe-signature'];

      if (sig == null) {
        console.log('\x1b[31m%s\x1b[0m', 'signature not found');
        return res.json({ success: false });
      }

      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', '---webhook error', err);
        res.status(400).send(`Webhook Error`);
        return;
      }

      console.log('---event', JSON.stringify(event, null, 2));

      const subscription = event.data.object as StripeCore.Subscription;
      console.log('Subscription', subscription);

      // Handle the event
      switch (event.type) {
        // This event `invoice.payment_succeeded` occurs when the payment has been done for the first time and when it is being renewed in every x time period.
        case 'invoice.payment_succeeded': {
          break;
        }

        // If the payment was done via stripe checkout.
        case 'checkout.session.completed': {
          break;
        }

        // When someone cancels the subscription. But you probably won't need this since you create an api to cancel it and update it immediately in the database. This is just for reference.
        case 'customer.subscription.deleted': {
          break;
        }

        // When someone creates the subscription for the first time. This won't be triggered when it's renewed. Better to use `invoice.payment_succeeded` for both creation and renewal process
        case 'customer.subscription.created': {
          break;
        }

        // When the renewal fails. Check this only after the subscription is active for the user.
        case `invoice.payment_failed`: {
          break;
        }

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({
        success: true,
      });
    });
}
