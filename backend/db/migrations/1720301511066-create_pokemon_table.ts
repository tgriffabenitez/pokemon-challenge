import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePokemonTable1720301511066 implements MigrationInterface {
    name = 'CreatePokemonTable1720301511066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "speed" integer NOT NULL, "hp" integer NOT NULL, "image_url" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pokemon"`);
    }

}
