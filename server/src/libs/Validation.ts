import type { ZodSchema } from 'zod';

import errorCodes from '../static/error-codes';

interface ValidationErrorResponse {
  success: boolean;
  code?: string;
  message?: string;
  errors?: { path: string; message: string }[];
}

class Validation {
  static validateSchema<T>(
    inputs: T,
    validationSchema: ZodSchema,
  ): [true, T] | [false, ValidationErrorResponse] {
    const validation = validationSchema.safeParse(inputs);
    if (!validation.success) {
      const errors = validation.error.issues?.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));
      return [
        false,
        {
          success: false,
          message: 'Input validation failed.',
          code: errorCodes.ERROR_INPUT_VALIDATION,
          errors,
        },
      ];
    }
    return [true, inputs];
  }
}

export default Validation;
