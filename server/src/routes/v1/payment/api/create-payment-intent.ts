import type { Router } from 'express';
import { z } from 'zod';

import ValidationLib from '../../../../libs/Validation';
import ErrorsLib from '../../../../libs/Errors';
import { withAccessTokenVerification } from '../../../../middlewares';

const validationSchema = z.object({
  paymentMethodId: z.string(),
});

export default function (app: Router) {
  app
    .route('/create-payment-intent')
    .post(withAccessTokenVerification(), function (req, res) {
      const [isValid, response] = ValidationLib.validateSchema(
        req.body,
        validationSchema,
      );

      if (!isValid) {
        return res.status(400).json(response);
      }

      try {
      } catch (error) {
        return res.status(500).json(ErrorsLib.catchException(error));
      }
    });
}
