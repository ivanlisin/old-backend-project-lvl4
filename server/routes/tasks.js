// @ts-check

// import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      const tasks = await app.objection.models.task.query()
        .withGraphJoined('[status, creator, performer]');
      reply.render('tasks/index', { tasks });
      return reply;
    });
};
