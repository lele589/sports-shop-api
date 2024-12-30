import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('products', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.string('type');
      table.float('basePrice');
      table.float('stock');
      table.string('imageUrl');
      table.date('creationDate');
    })
    .createTable('parts', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
    })
    .createTable('options', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.float('additionalPrice');
      table.float('stock');
    })
    .createTable('product_parts', (table) => {
      table.string('productId').references('id').inTable('products');
      table.string('partId').references('id').inTable('parts');
      table.primary(['productId', 'partId']);
    })
    .createTable('part_options', (table) => {
      table.string('partId').references('id').inTable('parts');
      table.string('optionId').references('id').inTable('options');
      table.primary(['partId', 'optionId']);
    })
    .createTable('dependencies', (table) => {
      table.string('optionId').references('id').inTable('options');
      table.string('disallowedOptionId').references('id').inTable('options');
      table.primary(['optionId', 'disallowedOptionId']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('dependencies')
    .dropTable('part_options')
    .dropTable('product_parts')
    .dropTable('options')
    .dropTable('parts')
    .dropTable('products');
}
