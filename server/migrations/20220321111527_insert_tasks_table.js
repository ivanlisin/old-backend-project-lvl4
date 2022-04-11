// @ts-check

export const up = (knex) => (
  knex('tasks').insert([
    {
      name: 'aaa',
      description: 'bbb',
      status_id: 1,
      creator_id: 1,
      performer_id: 1,
    },
  ])
);

export const down = () => {};
