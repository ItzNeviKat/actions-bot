import Koa from 'koa';
import koaBody from 'koa-body';
import koaLogger from 'koa-logger';
import koaCors from '@koa/cors';

import { router } from './router';

export const app = new Koa();

app
  .use(koaCors({ origin: '*' }))
  .use(koaBody())
  .use(router.allowedMethods())
  .use(router.routes());

if (process.env.NODE_ENV !== 'production' || process.env.DEBUG === '1')
  app.use(koaLogger());
