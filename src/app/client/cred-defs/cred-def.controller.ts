import * as Koa from 'koa';
import * as Router from 'koa-router';

import client from '../client';
import { CredDefService } from './cred-def.service';

const ctrl = client;

const credDefSvc = new CredDefService(ctrl.schema, ctrl.credDef);

const routerOpts: Router.IRouterOptions = {
  prefix: '/credential-definitions'
};

const router = new Router(routerOpts);

router.post('/', async (ctx: Koa.Context) => {
  let schema = ctx.request.body;
  try {
    const res = await credDefSvc.createCredDef(schema);
    return (ctx.body = res);
  } catch (err) {
    ctx.throw(400, err);
  }
});

export default router;
