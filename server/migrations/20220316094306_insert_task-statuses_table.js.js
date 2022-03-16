// @ts-check

export const up = (knex) => (
  knex('task-statuses').insert([
    { name: 'новый' },
    { name: 'в работе' },
    { name: 'на тестировании' },
    { name: 'завершен' },
  ])
);

export const down = () => {};
