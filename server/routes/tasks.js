// @ts-check

// import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      const tasks = await app.objection.models.task.query();
      console.log(tasks);
      console.log(tasks[0].status);
      console.log(tasks[0].creator);
      reply.render('tasks/index', { tasks });
      return reply;
    });
};
