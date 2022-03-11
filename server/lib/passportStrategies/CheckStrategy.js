// @ts-check

import { Strategy } from 'fastify-passport';

export default class CheckStrategy extends Strategy {
  constructor(name, app) {
    super(name);
    this.app = app;
  }

  async authenticate(request) {
    const { id } = request.params;
    const passport = request.session.get('passport');
    const user = await this.app.objection.models.user.query().findById(id);
    if (passport.email === user.email && passport.passwordDigest === user.passwordDigest) {
      return this.success(user);
    }
    return this.fail();
  }
}
