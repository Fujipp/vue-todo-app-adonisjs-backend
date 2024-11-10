import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Todos extends BaseSchema {
  protected tableName = 'todos';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');  // Primary key
      table.string('text').notNullable();  // Todo text
      table.boolean('completed').defaultTo(false);  // Completion status
      table.timestamps(true, true);  // Timestamps
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
