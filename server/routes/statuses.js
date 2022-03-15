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
    });
};
