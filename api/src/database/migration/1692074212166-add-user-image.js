// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddUserImage1692074212166 {
  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE public.user ADD COLUMN image varchar NULL`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  async down(queryRunner) {}
};
