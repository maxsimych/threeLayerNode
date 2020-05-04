import { validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

function expressCatch<T extends Request = Request>(
  asyncFunc: (req: T, res: Response) => Promise<void | Response>
) {
  return (req: T, res: Response, next: NextFunction): void => {
    const error = validationResult(req);
    error.throw();
    Promise.resolve(asyncFunc(req, res)).catch(next);
  };
}

export { expressCatch };