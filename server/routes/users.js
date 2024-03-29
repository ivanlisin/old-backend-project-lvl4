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
    .get('/users/:id/edit', app.fp.authenticate('check', async (req, reply, err, user) => {
      const { id } = req.params;
      if (err) {
        return app.httpErrors.internalServerError(err);
      }
      if (!user) {
        req.flash('info', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      reply.render('users/edit', { id, user });
      return reply;
    }))
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
    .patch('/users/:id', app.fp.authenticate('check', async (req, reply, err, user) => {
      if (err) {
        return app.httpErrors.internalServerError(err);
      }
      if (!user) {
        req.flash('info', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      try {
        const { data } = req.body;
        await user.$query().patch({ ...data });
        req.flash('info', i18next.t('flash.users.edit.success'));
        reply.redirect(app.reverse('users'));
        return reply;
      } catch (e) {
        req.flash('error', i18next.t('flash.users.edit.error'));
        reply.render('users/edit', { user: req.body.data, errors: e.data });
        return reply;
      }
    }))
    .delete('/users/:id', app.fp.authenticate('check', async (req, reply, err, user) => {
      if (err) {
        return app.httpErrors.internalServerError(err);
      }
      if (!user) {
        req.flash('info', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      try {
        req.logOut();
        await user.$query().delete();
        req.flash('info', i18next.t('flash.users.delete.success'));
        reply.redirect(app.reverse('users'));
        return reply;
      } catch (e) {
        req.flash('error', i18next.t('flash.users.delete.error'));
        reply.render('users/edit', { user: req.body.data, errors: e.data });
        return reply;
      }
    }));
};
