// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddUserRefreshToken1692078621713 {
  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE public.user ADD COLUMN "refreshToken" varchar NULL`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  async down(queryRunner) {}
};
