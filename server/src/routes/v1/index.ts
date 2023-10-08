import type { Request, Router as ExpressRouter } from 'express';
import { Router } from 'express';

import payment from './payment';

export type RouteInitiator = (_: ExpressRouter) => void;

const router = Router({ mergeParams: true });

const VERSION = 'v1';

interface RequestV1 extends Request {
  version?: typeof VERSION;
}

router.use(function (req: RequestV1, _, next) {
  req.version = VERSION;
  next();
});

const controllers: RouteInitiator[] = [payment];

export default function v1(app: ExpressRouter) {
  app.use(`/${VERSION}`, router);

  controllers.forEach((item) => {
    item(router);
  });
}
