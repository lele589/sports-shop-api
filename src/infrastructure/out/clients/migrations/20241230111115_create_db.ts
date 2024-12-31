import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('products', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.string('type').notNullable();
      table.float('basePrice').notNullable();
      table.float('stock').notNullable();
      table.string('imageUrl').notNullable();
      table.date('creationDate').notNullable();
    })
    .createTable('parts', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
    })
    .createTable('options', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.float('additionalPrice').notNullable();
      table.float('stock').notNullable();
    })
    .createTable('product_parts', (table) => {
      table
        .integer('productId')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE');
      table.integer('partId').unsigned().references('id').inTable('parts').onDelete('CASCADE');
      table.primary(['productId', 'partId']);
    })
    .createTable('part_options', (table) => {
      table.integer('partId').unsigned().references('id').inTable('parts').onDelete('CASCADE');
      table.integer('optionId').unsigned().references('id').inTable('options').onDelete('CASCADE');
      table.primary(['partId', 'optionId']);
    })
    .createTable('dependencies', (table) => {
      table.integer('optionId').unsigned().references('id').inTable('options').onDelete('CASCADE');
      table
        .integer('disallowedOptionId')
        .unsigned()
        .references('id')
        .inTable('options')
        .onDelete('CASCADE');
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
