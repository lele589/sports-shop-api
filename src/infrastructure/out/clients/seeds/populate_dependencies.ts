import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('dependencies').insert([
    { optionId: 5, disallowedOptionId: 2 },
    { optionId: 7, disallowedOptionId: 8 },
  ]);
}
