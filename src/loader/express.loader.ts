import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from 'src/components/contact/contact.controller';
import type { Response, Request, Application } from 'express';

export const expressLoader = (app: Application): Application => {
  app.disable('x-powered-by');

  app.use(cors());
  app.use(bodyParser.json());

  app.use(router);

  app.use((err: Error, req: Request, res: Response) => {
    console.error(err);
    if (!res.headersSent) res.sendStatus(500);
  });

  return app;
}