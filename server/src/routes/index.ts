import type { Router as ExpressRouter } from 'express';

import api from './api';
import stripe from './stripe';

export default function (app: ExpressRouter) {
  api(app);
  stripe(app);
}
