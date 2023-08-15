// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateAccountTable1692067411001 {
  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE public.account (id uuid NOT NULL, "createdAt" timestamp NOT NULL DEFAULT now(), "updatedAt" timestamp NOT NULL DEFAULT now(), "deletedAt" timestamp NULL, PRIMARY KEY(id))`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  async down(queryRunner) {}
};
