import type { Express, Router as ExpressRouter } from 'express';

import v1 from './v1';

export type RouteInitiator = (_: ExpressRouter) => void;

const versions: RouteInitiator[] = [v1];

export default function (app: Express) {
  for (const item of versions) {
    item(app);
  }
}
