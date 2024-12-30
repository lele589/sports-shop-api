import { Knex } from 'knex';
import path from 'path';

// It's needed to create different configurations for each environment
const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3',
  },
  migrations: {
    directory: path.join(__dirname, 'src/infrastructure/out/clients/migrations'),
  },
  useNullAsDefault: true,
};

export default config;
