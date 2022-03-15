// @ts-check

export const up = (knex) => (
  knex.schema.createTable('task-statuses', (table) => {
    table.string('name');
  })
);

export const down = (knex) => knex.schema.dropTable('task-statuses');
