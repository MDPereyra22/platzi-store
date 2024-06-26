import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserCostumer1719248983393 implements MigrationInterface {
    name = 'UpdateUserCostumer1719248983393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_892a39268f6790f01f5eb8c1a20"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "costumerId" TO "custumerId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_a1b6c23ec6006e114b7d04a02ae" FOREIGN KEY ("custumerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_a1b6c23ec6006e114b7d04a02ae"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "custumerId" TO "costumerId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_892a39268f6790f01f5eb8c1a20" FOREIGN KEY ("costumerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
