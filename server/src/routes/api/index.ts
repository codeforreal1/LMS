import type { Router as ExpressRouter } from 'express';
import { Router } from 'express';

import v1 from './v1';

export type RouteInitiator = (_: ExpressRouter) => void;

const router = Router({ mergeParams: true });

const routes: RouteInitiator[] = [v1];

export default function api(app: ExpressRouter) {
  app.use('/api', router);

  routes.forEach((item) => {
    item(router);
  });
}
