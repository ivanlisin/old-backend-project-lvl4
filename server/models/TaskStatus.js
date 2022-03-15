// @ts-check

import { Model } from 'objection';

export default class TaskStatus extends Model {
  static get tableName() {
    return 'task-statuses';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name',
      ],
      properties: {
        name: { type: 'string', minLength: 1 },
      },
    };
  }
}
