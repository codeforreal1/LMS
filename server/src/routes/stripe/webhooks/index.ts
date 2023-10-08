import type { Router as ExpressRouter } from 'express';
import { Router } from 'express';

import type { RouteInitiator } from '../index';
import api from './api';

const router = Router({ mergeParams: true });

const controllers: RouteInitiator[] = [api];

export default function (app: ExpressRouter) {
  app.use('/webhooks', router);

  for (const controller of controllers) {
    controller(router);
  }
}
