import type { Router as ExpressRouter } from 'express';
import { Router } from 'express';

import type { RouteInitiator } from '../../index';
import subscription from './subscription';

const router = Router({ mergeParams: true });

const controllers: RouteInitiator[] = [subscription];

export default function (app: ExpressRouter) {
  app.use('/api', router);

  for (const controller of controllers) {
    controller(router);
  }
}
