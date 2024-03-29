// @ts-check

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrations = {
  directory: path.join(__dirname, 'server', 'migrations'),
};

export const development = {
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite',
  },
  useNullAsDefault: true,
  migrations,
};

export const test = {
  client: 'sqlite3',
  connection: ':memory:',
  useNullAsDefault: true,
  migrations,
};

export const production = {
  client: 'pg',
  connection: `${process.env.DATABASE_URL}?sslmode=require`,
  ssl: { rejectUnauthorized: false },
  useNullAsDefault: true,
  migrations,
};
