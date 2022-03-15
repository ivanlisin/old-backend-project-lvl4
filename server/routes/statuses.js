import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses' }, app.fp.authenticate('check', async (req, reply, err, user) => {
      if (err) {
        return app.httpErrors.internalServerError(err);
      }
      if (!user) {
        req.flash('info', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      const statuses = await app.objection.models.taskStatus.query();
      reply.render('statuses/index', { statuses });
      return reply;
    }));
};
