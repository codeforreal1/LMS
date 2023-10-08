import type { Router as ExpressRouter } from 'express';
import { Router } from 'express';

import webhooks from './webhooks';

export type RouteInitiator = (_: ExpressRouter) => void;

const router = Router({ mergeParams: true });

const controllers: RouteInitiator[] = [webhooks];

export default function v1(app: ExpressRouter) {
  app.use('/stripe', router);

  controllers.forEach((item) => {
    item(router);
  });
}
