import { MigrationInterface, QueryRunner } from "typeorm";
//This file contains all the migrations for creating all the entities in the database

export class CreateSchema1750072494413 implements MigrationInterface {
  name = 'CreateSchema1750072494413'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL, "manufacturer" character varying NOT NULL, "cost_in_credits" character varying NOT NULL, "length" character varying NOT NULL, "max_atmosphering_speed" character varying NOT NULL, "crew" character varying NOT NULL, "passengers" character varying NOT NULL, "cargo_capacity" character varying NOT NULL, "consumables" character varying NOT NULL, "vehicle_class" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, "url" character varying, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "starship" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL, "manufacturer" character varying NOT NULL, "cost_in_credits" character varying NOT NULL, "length" character varying NOT NULL, "max_atmosphering_speed" character varying NOT NULL, "crew" character varying NOT NULL, "passengers" character varying NOT NULL, "cargo_capacity" character varying NOT NULL, "consumables" character varying NOT NULL, "hyperdrive_rating" character varying NOT NULL, "MGLT" character varying NOT NULL, "starship_class" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_398cab92a55d977f03881dda8e1" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "height" character varying NOT NULL, "mass" character varying NOT NULL, "hair_color" character varying NOT NULL, "skin_color" character varying NOT NULL, "eye_color" character varying NOT NULL, "birth_year" character varying NOT NULL, "gender" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, "url" character varying, "homeworldId" integer, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "planet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "rotation_period" character varying NOT NULL, "orbital_period" character varying NOT NULL, "diameter" character varying NOT NULL, "climate" character varying NOT NULL, "gravity" character varying NOT NULL, "terrain" character varying NOT NULL, "surface_water" character varying NOT NULL, "population" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_cb7506671ad0f19d6287ee4bfb7" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "specie" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "classification" character varying NOT NULL, "language" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, "url" character varying NOT NULL, "homeworldId" integer, CONSTRAINT "PK_ae8a78cf6f1cffa5f4cfa7d58f4" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "film" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "episode_id" integer NOT NULL, "opening_crawl" character varying NOT NULL, "director" character varying NOT NULL, "producer" character varying NOT NULL, "release_date" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "originalName" character varying NOT NULL, "path" character varying NOT NULL, "personId" integer, "filmId" integer, "specieId" integer, "planetId" integer, "starshipId" integer, "vehicleId" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "vehicle_images_image" ("vehicleId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_5282eebc82da043a31e44109999" PRIMARY KEY ("vehicleId", "imageId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_d8ff442225197f47a4afb5ab4c" ON "vehicle_images_image" ("vehicleId") `);
    await queryRunner.query(`CREATE INDEX "IDX_7ddc16f9bb9a2273e0d163a3b4" ON "vehicle_images_image" ("imageId") `);
    await queryRunner.query(`CREATE TABLE "starship_images_image" ("starshipId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_beb9a95e982dfb042d73a99dcef" PRIMARY KEY ("starshipId", "imageId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_729d636a61644957e82bfa9ddd" ON "starship_images_image" ("starshipId") `);
    await queryRunner.query(`CREATE INDEX "IDX_2e8069f778fa086f43f0a2757b" ON "starship_images_image" ("imageId") `);
    await queryRunner.query(`CREATE TABLE "person_species_specie" ("personId" integer NOT NULL, "specieId" integer NOT NULL, CONSTRAINT "PK_a067c0c80caa29d8f68c9c435e3" PRIMARY KEY ("personId", "specieId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_10f5e82ddc0e1f67f779f37c21" ON "person_species_specie" ("personId") `);
    await queryRunner.query(`CREATE INDEX "IDX_768ccc6a23ed03f3e4fc27cd83" ON "person_species_specie" ("specieId") `);
    await queryRunner.query(`CREATE TABLE "person_vehicles_vehicle" ("personId" integer NOT NULL, "vehicleId" integer NOT NULL, CONSTRAINT "PK_7b5f283228aaa23fd37176132ef" PRIMARY KEY ("personId", "vehicleId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_93eb9aed40f347d6d9eb37af39" ON "person_vehicles_vehicle" ("personId") `);
    await queryRunner.query(`CREATE INDEX "IDX_dcca73435d3a911aec3a8c6a8e" ON "person_vehicles_vehicle" ("vehicleId") `);
    await queryRunner.query(`CREATE TABLE "person_starships_starship" ("personId" integer NOT NULL, "starshipId" integer NOT NULL, CONSTRAINT "PK_a5e997da6c0e7cf98a9793c7ae7" PRIMARY KEY ("personId", "starshipId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_5b4b4623267b28750ae11a5309" ON "person_starships_starship" ("personId") `);
    await queryRunner.query(`CREATE INDEX "IDX_18aaf7b5a5268c1d99b1385adf" ON "person_starships_starship" ("starshipId") `);
    await queryRunner.query(`CREATE TABLE "person_images_image" ("personId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_71596fc80d5312441d4d84d8968" PRIMARY KEY ("personId", "imageId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_1f602aa2ba042da88f9d627eee" ON "person_images_image" ("personId") `);
    await queryRunner.query(`CREATE INDEX "IDX_6686fc8143c0ea3f62edf8ce7d" ON "person_images_image" ("imageId") `);
    await queryRunner.query(`CREATE TABLE "planet_images_image" ("planetId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_041f9cc1eb08c744b7aff5cb0d2" PRIMARY KEY ("planetId", "imageId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_7a4601b335e4ba6e117f8ee1a4" ON "planet_images_image" ("planetId") `);
    await queryRunner.query(`CREATE INDEX "IDX_5b9529b163b41319d7ca8da54c" ON "planet_images_image" ("imageId") `);
    await queryRunner.query(`CREATE TABLE "specie_images_image" ("specieId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_8cd530bf5ff734db07ddc5e584f" PRIMARY KEY ("specieId", "imageId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_2549dcb2950dbcdb7208ef2c72" ON "specie_images_image" ("specieId") `);
    await queryRunner.query(`CREATE INDEX "IDX_68002fc37c9decb3f9300af84b" ON "specie_images_image" ("imageId") `);
    await queryRunner.query(`CREATE TABLE "film_characters_person" ("filmId" integer NOT NULL, "personId" integer NOT NULL, CONSTRAINT "PK_e536a1586c95203e61910a7119c" PRIMARY KEY ("filmId", "personId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_7c9df9a723ecdbadcfe8362646" ON "film_characters_person" ("filmId") `);
    await queryRunner.query(`CREATE INDEX "IDX_76a39805866b99358326c6153a" ON "film_characters_person" ("personId") `);
    await queryRunner.query(`CREATE TABLE "film_planets_planet" ("filmId" integer NOT NULL, "planetId" integer NOT NULL, CONSTRAINT "PK_b0996a2f9f2ef9b1f80223d30b2" PRIMARY KEY ("filmId", "planetId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_9e9d858b064b7d0fa02a9764e1" ON "film_planets_planet" ("filmId") `);
    await queryRunner.query(`CREATE INDEX "IDX_6821d91826ca31cc4e4588b535" ON "film_planets_planet" ("planetId") `);
    await queryRunner.query(`CREATE TABLE "film_starships_starship" ("filmId" integer NOT NULL, "starshipId" integer NOT NULL, CONSTRAINT "PK_130ea5faa82565e819f8d575289" PRIMARY KEY ("filmId", "starshipId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_ed79253745f81534b737ce768c" ON "film_starships_starship" ("filmId") `);
    await queryRunner.query(`CREATE INDEX "IDX_21297c5d74a841542bcb7fe063" ON "film_starships_starship" ("starshipId") `);
    await queryRunner.query(`CREATE TABLE "film_vehicles_vehicle" ("filmId" integer NOT NULL, "vehicleId" integer NOT NULL, CONSTRAINT "PK_ace6d3e1be3bbc2107df07eade5" PRIMARY KEY ("filmId", "vehicleId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_af46f6d0bef8eba92546a8c537" ON "film_vehicles_vehicle" ("filmId") `);
    await queryRunner.query(`CREATE INDEX "IDX_8be4e7e1014359bb4715338cf2" ON "film_vehicles_vehicle" ("vehicleId") `);
    await queryRunner.query(`CREATE TABLE "film_species_specie" ("filmId" integer NOT NULL, "specieId" integer NOT NULL, CONSTRAINT "PK_31a636b542677941395bbe0b42f" PRIMARY KEY ("filmId", "specieId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_57e6df74dce55bd710f01c44bb" ON "film_species_specie" ("filmId") `);
    await queryRunner.query(`CREATE INDEX "IDX_5a19d397f578506a444ad76cfa" ON "film_species_specie" ("specieId") `);
    await queryRunner.query(`CREATE TABLE "film_images_image" ("filmId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_db3c536133fc84134bb233bf463" PRIMARY KEY ("filmId", "imageId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_7ca4abe9bcf237e1e1718076dc" ON "film_images_image" ("filmId") `);
    await queryRunner.query(`CREATE INDEX "IDX_28cb826698439437bc28b76aa9" ON "film_images_image" ("imageId") `);
    await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_997edaa4b7b556c0d557cc6e1bb" FOREIGN KEY ("homeworldId") REFERENCES "planet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "specie" ADD CONSTRAINT "FK_55bd54b68d6b9484ec932556182" FOREIGN KEY ("homeworldId") REFERENCES "planet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_89a43731e1ed10a765b76e161b8" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_bd8cc9c576f9525120aa5e1b058" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_34cbc891357b2f1b84975048feb" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_282e5fa53a7b9a5c012c215c2ca" FOREIGN KEY ("planetId") REFERENCES "planet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_c2424c9afe236559b8b806e227d" FOREIGN KEY ("starshipId") REFERENCES "starship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_5f21c4268f97c67e2f05b27d427" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "vehicle_images_image" ADD CONSTRAINT "FK_d8ff442225197f47a4afb5ab4ca" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "vehicle_images_image" ADD CONSTRAINT "FK_7ddc16f9bb9a2273e0d163a3b43" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "starship_images_image" ADD CONSTRAINT "FK_729d636a61644957e82bfa9ddd0" FOREIGN KEY ("starshipId") REFERENCES "starship"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "starship_images_image" ADD CONSTRAINT "FK_2e8069f778fa086f43f0a2757be" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "person_species_specie" ADD CONSTRAINT "FK_10f5e82ddc0e1f67f779f37c21e" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "person_species_specie" ADD CONSTRAINT "FK_768ccc6a23ed03f3e4fc27cd839" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "person_vehicles_vehicle" ADD CONSTRAINT "FK_93eb9aed40f347d6d9eb37af39c" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "person_vehicles_vehicle" ADD CONSTRAINT "FK_dcca73435d3a911aec3a8c6a8eb" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "person_starships_starship" ADD CONSTRAINT "FK_5b4b4623267b28750ae11a53094" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "person_starships_starship" ADD CONSTRAINT "FK_18aaf7b5a5268c1d99b1385adf9" FOREIGN KEY ("starshipId") REFERENCES "starship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "person_images_image" ADD CONSTRAINT "FK_1f602aa2ba042da88f9d627eee6" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "person_images_image" ADD CONSTRAINT "FK_6686fc8143c0ea3f62edf8ce7d9" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "planet_images_image" ADD CONSTRAINT "FK_7a4601b335e4ba6e117f8ee1a47" FOREIGN KEY ("planetId") REFERENCES "planet"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "planet_images_image" ADD CONSTRAINT "FK_5b9529b163b41319d7ca8da54c7" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "specie_images_image" ADD CONSTRAINT "FK_2549dcb2950dbcdb7208ef2c725" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "specie_images_image" ADD CONSTRAINT "FK_68002fc37c9decb3f9300af84b0" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "film_characters_person" ADD CONSTRAINT "FK_7c9df9a723ecdbadcfe83626467" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "film_characters_person" ADD CONSTRAINT "FK_76a39805866b99358326c6153a0" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "film_planets_planet" ADD CONSTRAINT "FK_9e9d858b064b7d0fa02a9764e18" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "film_planets_planet" ADD CONSTRAINT "FK_6821d91826ca31cc4e4588b5355" FOREIGN KEY ("planetId") REFERENCES "planet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "film_starships_starship" ADD CONSTRAINT "FK_ed79253745f81534b737ce768c1" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "film_starships_starship" ADD CONSTRAINT "FK_21297c5d74a841542bcb7fe063a" FOREIGN KEY ("starshipId") REFERENCES "starship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "film_vehicles_vehicle" ADD CONSTRAINT "FK_af46f6d0bef8eba92546a8c5375" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "film_vehicles_vehicle" ADD CONSTRAINT "FK_8be4e7e1014359bb4715338cf20" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "film_species_specie" ADD CONSTRAINT "FK_57e6df74dce55bd710f01c44bb8" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "film_species_specie" ADD CONSTRAINT "FK_5a19d397f578506a444ad76cfac" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "film_images_image" ADD CONSTRAINT "FK_7ca4abe9bcf237e1e1718076dcf" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "film_images_image" ADD CONSTRAINT "FK_28cb826698439437bc28b76aa9c" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "film_images_image" DROP CONSTRAINT "FK_28cb826698439437bc28b76aa9c"`);
    await queryRunner.query(`ALTER TABLE "film_images_image" DROP CONSTRAINT "FK_7ca4abe9bcf237e1e1718076dcf"`);
    await queryRunner.query(`ALTER TABLE "film_species_specie" DROP CONSTRAINT "FK_5a19d397f578506a444ad76cfac"`);
    await queryRunner.query(`ALTER TABLE "film_species_specie" DROP CONSTRAINT "FK_57e6df74dce55bd710f01c44bb8"`);
    await queryRunner.query(`ALTER TABLE "film_vehicles_vehicle" DROP CONSTRAINT "FK_8be4e7e1014359bb4715338cf20"`);
    await queryRunner.query(`ALTER TABLE "film_vehicles_vehicle" DROP CONSTRAINT "FK_af46f6d0bef8eba92546a8c5375"`);
    await queryRunner.query(`ALTER TABLE "film_starships_starship" DROP CONSTRAINT "FK_21297c5d74a841542bcb7fe063a"`);
    await queryRunner.query(`ALTER TABLE "film_starships_starship" DROP CONSTRAINT "FK_ed79253745f81534b737ce768c1"`);
    await queryRunner.query(`ALTER TABLE "film_planets_planet" DROP CONSTRAINT "FK_6821d91826ca31cc4e4588b5355"`);
    await queryRunner.query(`ALTER TABLE "film_planets_planet" DROP CONSTRAINT "FK_9e9d858b064b7d0fa02a9764e18"`);
    await queryRunner.query(`ALTER TABLE "film_characters_person" DROP CONSTRAINT "FK_76a39805866b99358326c6153a0"`);
    await queryRunner.query(`ALTER TABLE "film_characters_person" DROP CONSTRAINT "FK_7c9df9a723ecdbadcfe83626467"`);
    await queryRunner.query(`ALTER TABLE "specie_images_image" DROP CONSTRAINT "FK_68002fc37c9decb3f9300af84b0"`);
    await queryRunner.query(`ALTER TABLE "specie_images_image" DROP CONSTRAINT "FK_2549dcb2950dbcdb7208ef2c725"`);
    await queryRunner.query(`ALTER TABLE "planet_images_image" DROP CONSTRAINT "FK_5b9529b163b41319d7ca8da54c7"`);
    await queryRunner.query(`ALTER TABLE "planet_images_image" DROP CONSTRAINT "FK_7a4601b335e4ba6e117f8ee1a47"`);
    await queryRunner.query(`ALTER TABLE "person_images_image" DROP CONSTRAINT "FK_6686fc8143c0ea3f62edf8ce7d9"`);
    await queryRunner.query(`ALTER TABLE "person_images_image" DROP CONSTRAINT "FK_1f602aa2ba042da88f9d627eee6"`);
    await queryRunner.query(`ALTER TABLE "person_starships_starship" DROP CONSTRAINT "FK_18aaf7b5a5268c1d99b1385adf9"`);
    await queryRunner.query(`ALTER TABLE "person_starships_starship" DROP CONSTRAINT "FK_5b4b4623267b28750ae11a53094"`);
    await queryRunner.query(`ALTER TABLE "person_vehicles_vehicle" DROP CONSTRAINT "FK_dcca73435d3a911aec3a8c6a8eb"`);
    await queryRunner.query(`ALTER TABLE "person_vehicles_vehicle" DROP CONSTRAINT "FK_93eb9aed40f347d6d9eb37af39c"`);
    await queryRunner.query(`ALTER TABLE "person_species_specie" DROP CONSTRAINT "FK_768ccc6a23ed03f3e4fc27cd839"`);
    await queryRunner.query(`ALTER TABLE "person_species_specie" DROP CONSTRAINT "FK_10f5e82ddc0e1f67f779f37c21e"`);
    await queryRunner.query(`ALTER TABLE "starship_images_image" DROP CONSTRAINT "FK_2e8069f778fa086f43f0a2757be"`);
    await queryRunner.query(`ALTER TABLE "starship_images_image" DROP CONSTRAINT "FK_729d636a61644957e82bfa9ddd0"`);
    await queryRunner.query(`ALTER TABLE "vehicle_images_image" DROP CONSTRAINT "FK_7ddc16f9bb9a2273e0d163a3b43"`);
    await queryRunner.query(`ALTER TABLE "vehicle_images_image" DROP CONSTRAINT "FK_d8ff442225197f47a4afb5ab4ca"`);
    await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_5f21c4268f97c67e2f05b27d427"`);
    await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_c2424c9afe236559b8b806e227d"`);
    await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_282e5fa53a7b9a5c012c215c2ca"`);
    await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_34cbc891357b2f1b84975048feb"`);
    await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_bd8cc9c576f9525120aa5e1b058"`);
    await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_89a43731e1ed10a765b76e161b8"`);
    await queryRunner.query(`ALTER TABLE "specie" DROP CONSTRAINT "FK_55bd54b68d6b9484ec932556182"`);
    await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_997edaa4b7b556c0d557cc6e1bb"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_28cb826698439437bc28b76aa9"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7ca4abe9bcf237e1e1718076dc"`);
    await queryRunner.query(`DROP TABLE "film_images_image"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5a19d397f578506a444ad76cfa"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_57e6df74dce55bd710f01c44bb"`);
    await queryRunner.query(`DROP TABLE "film_species_specie"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_8be4e7e1014359bb4715338cf2"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_af46f6d0bef8eba92546a8c537"`);
    await queryRunner.query(`DROP TABLE "film_vehicles_vehicle"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_21297c5d74a841542bcb7fe063"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ed79253745f81534b737ce768c"`);
    await queryRunner.query(`DROP TABLE "film_starships_starship"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6821d91826ca31cc4e4588b535"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9e9d858b064b7d0fa02a9764e1"`);
    await queryRunner.query(`DROP TABLE "film_planets_planet"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_76a39805866b99358326c6153a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7c9df9a723ecdbadcfe8362646"`);
    await queryRunner.query(`DROP TABLE "film_characters_person"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_68002fc37c9decb3f9300af84b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_2549dcb2950dbcdb7208ef2c72"`);
    await queryRunner.query(`DROP TABLE "specie_images_image"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5b9529b163b41319d7ca8da54c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7a4601b335e4ba6e117f8ee1a4"`);
    await queryRunner.query(`DROP TABLE "planet_images_image"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6686fc8143c0ea3f62edf8ce7d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_1f602aa2ba042da88f9d627eee"`);
    await queryRunner.query(`DROP TABLE "person_images_image"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_18aaf7b5a5268c1d99b1385adf"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5b4b4623267b28750ae11a5309"`);
    await queryRunner.query(`DROP TABLE "person_starships_starship"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_dcca73435d3a911aec3a8c6a8e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_93eb9aed40f347d6d9eb37af39"`);
    await queryRunner.query(`DROP TABLE "person_vehicles_vehicle"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_768ccc6a23ed03f3e4fc27cd83"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_10f5e82ddc0e1f67f779f37c21"`);
    await queryRunner.query(`DROP TABLE "person_species_specie"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_2e8069f778fa086f43f0a2757b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_729d636a61644957e82bfa9ddd"`);
    await queryRunner.query(`DROP TABLE "starship_images_image"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7ddc16f9bb9a2273e0d163a3b4"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d8ff442225197f47a4afb5ab4c"`);
    await queryRunner.query(`DROP TABLE "vehicle_images_image"`);
    await queryRunner.query(`DROP TABLE "image"`);
    await queryRunner.query(`DROP TABLE "film"`);
    await queryRunner.query(`DROP TABLE "specie"`);
    await queryRunner.query(`DROP TABLE "planet"`);
    await queryRunner.query(`DROP TABLE "person"`);
    await queryRunner.query(`DROP TABLE "starship"`);
    await queryRunner.query(`DROP TABLE "vehicle"`);
    await queryRunner.query(`DROP TABLE "user"`);

  }

}
