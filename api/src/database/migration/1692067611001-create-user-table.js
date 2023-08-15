// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateUserTable1692067611001 {
  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE public.user (id uuid NOT NULL, "accountId" uuid NOT NULL, name varchar NOT NULL, email varchar NOT NULL, password varchar NOT NULL, "createdAt" timestamp NOT NULL DEFAULT now(), "updatedAt" timestamp NOT NULL DEFAULT now(), "deletedAt" timestamp NULL, PRIMARY KEY(id), FOREIGN KEY("accountId") REFERENCES account(id))`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  async down(queryRunner) {}
};
