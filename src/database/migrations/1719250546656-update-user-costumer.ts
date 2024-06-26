import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserCostumer1719250546656 implements MigrationInterface {
    name = 'UpdateUserCostumer1719250546656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_a1b6c23ec6006e114b7d04a02ae"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "custumerId" TO "customerId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "customerId" TO "custumerId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_a1b6c23ec6006e114b7d04a02ae" FOREIGN KEY ("custumerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
