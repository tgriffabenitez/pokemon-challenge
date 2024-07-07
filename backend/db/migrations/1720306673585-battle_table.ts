import { MigrationInterface, QueryRunner } from "typeorm";

export class BattleTable1720306673585 implements MigrationInterface {
    name = 'BattleTable1720306673585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "turns" integer NOT NULL, "fightDate" datetime NOT NULL, "pokemon1Id" varchar, "pokemon2Id" varchar, "winnerId" varchar, "loserId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "turns" integer NOT NULL, "fightDate" datetime NOT NULL, "pokemon1Id" varchar, "pokemon2Id" varchar, "winnerId" varchar, "loserId" varchar, CONSTRAINT "FK_d6de3ef4c04a515afb256111fd0" FOREIGN KEY ("pokemon1Id") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7df2fdef5c10626b94d7c7be3f0" FOREIGN KEY ("pokemon2Id") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0f28157daad5bdcf01ba0c6430d" FOREIGN KEY ("winnerId") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_eca4550a510e58e8ff8bad572b1" FOREIGN KEY ("loserId") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_battle"("id", "turns", "fightDate", "pokemon1Id", "pokemon2Id", "winnerId", "loserId") SELECT "id", "turns", "fightDate", "pokemon1Id", "pokemon2Id", "winnerId", "loserId" FROM "battle"`);
        await queryRunner.query(`DROP TABLE "battle"`);
        await queryRunner.query(`ALTER TABLE "temporary_battle" RENAME TO "battle"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "battle" RENAME TO "temporary_battle"`);
        await queryRunner.query(`CREATE TABLE "battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "turns" integer NOT NULL, "fightDate" datetime NOT NULL, "pokemon1Id" varchar, "pokemon2Id" varchar, "winnerId" varchar, "loserId" varchar)`);
        await queryRunner.query(`INSERT INTO "battle"("id", "turns", "fightDate", "pokemon1Id", "pokemon2Id", "winnerId", "loserId") SELECT "id", "turns", "fightDate", "pokemon1Id", "pokemon2Id", "winnerId", "loserId" FROM "temporary_battle"`);
        await queryRunner.query(`DROP TABLE "temporary_battle"`);
        await queryRunner.query(`DROP TABLE "battle"`);
    }

}
