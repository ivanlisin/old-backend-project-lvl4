import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('info', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      const statuses = await app.objection.models.taskStatus.query();
      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('info', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      const status = new app.objection.models.taskStatus();
      reply.render('statuses/new', { status });
      return reply;
    })
    .post('/statuses', async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('info', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      try {
        const status = await app.objection.models.taskStatus.fromJson(req.body.data);
        await app.objection.models.taskStatus.query().insert(status);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        reply.redirect(app.reverse('root'));
        return reply;
      } catch (err) {
        req.flash('error', i18next.t('flash.statuses.create.error'));
        reply.render('status/new', { status: req.body.data, errors: err.data });
        return reply;
      }
    })
    .get('/statuses/:id/edit', async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('info', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      const { id } = req.params;
      const status = await app.objection.models.taskStatus.query().findById(id);
      reply.render('statuses/edit', { id, status });
      return reply;
    })
    .patch('/statuses/:id', async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('info', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      try {
        const { id } = req.params;
        const { data } = req.body;
        const status = await app.objection.models.taskStatus.query().findById(id);
        await status.$query().patch({ ...data });
        req.flash('info', i18next.t('flash.statuses.edit.success'));
        reply.redirect(app.reverse('statuses'));
        return reply;
      } catch (e) {
        req.flash('error', i18next.t('flash.statuses.edit.error'));
        reply.render('statuses/edit', { status: req.body.data, errors: e.data });
        return reply;
      }
    });
};
