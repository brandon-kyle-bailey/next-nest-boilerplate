// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
const { QueryRunner } = require('typeorm');

module.exports = class Init1692066053862 {
  async up(queryRunner) {
    await queryRunner.createDatabase('core', true);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryRunner) {
    // await queryRunner.dropDatabase('core', true);
  }
};
