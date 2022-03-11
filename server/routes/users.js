// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })
    .get('/users/:id/edit', async (req, reply) => {
      const { id } = req.params;
      const passport = req.session.get('passport');
      const user = await app.objection.models.user.query().findById(id);
      if (passport.email === user.email && passport.passwordDigest === user.passwordDigest) {
        reply.render('users/edit', { id, user });
        return reply;
      }
      req.flash('info', i18next.t('flash.authError'));
      reply.redirect(app.reverse('root'));
      return reply;
    })
    .post('/users', async (req, reply) => {
      try {
        const user = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(user);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
        return reply;
      } catch (err) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user: req.body.data, errors: err.data });
        return reply;
      }
    })
    .patch('/users/:id', async (req, reply) => {
      try {
        const { id } = req.params;
        const { data } = req.body;
        const user = await app.objection.models.user.query().findById(id);
        await user.$query().patch({ ...data });
        req.flash('info', i18next.t('flash.users.edit.success'));
        reply.redirect(app.reverse('users'));
        return reply;
      } catch (err) {
        req.flash('error', i18next.t('flash.users.edit.error'));
        reply.render('users/edit', { user: req.body.data, errors: err.data });
        return reply;
      }
    })
    .delete('/users/:id', async (req, reply) => {
      try {
        const { id } = req.params;
        const user = await app.objection.models.user.query().findById(id);
        await user.$query().delete();
        req.flash('info', i18next.t('flash.users.delete.success'));
        reply.redirect(app.reverse('users'));
        return reply;
      } catch (err) {
        req.flash('error', i18next.t('flash.users.delete.error'));
        reply.render('users/edit', { user: req.body.data, errors: err.data });
        return reply;
      }
    });
};
