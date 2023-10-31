import type { Router as ExpressRouter } from 'express';
import { Router } from 'express';

import type { RouteInitiator } from '../index';
import createPaymentIntent from './create-payment-intent';

const router = Router({ mergeParams: true });

const controllers: RouteInitiator[] = [createPaymentIntent];

export default function (app: ExpressRouter) {
  app.use('/payment', router);

  for (const controller of controllers) {
    controller(router);
  }
}
