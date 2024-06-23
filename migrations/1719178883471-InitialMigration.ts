import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1719178883471 implements MigrationInterface {
    name = 'InitialMigration1719178883471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "prueba" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "prueba"`);
    }

}
