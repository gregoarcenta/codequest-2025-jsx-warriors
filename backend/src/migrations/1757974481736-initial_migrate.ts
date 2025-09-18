import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrate1757974481736 implements MigrationInterface {
    name = 'InitialMigrate1757974481736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "post_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_e4ac7cb9daf243939c6eabb2e0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "discord_id" character varying(50), "full_name" character varying(150) NOT NULL, "email" character varying(254) NOT NULL, "password" character varying(60), "avatar_url" text, "bio" character varying(254), "is_active" boolean NOT NULL DEFAULT true, "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{user}', "last_login_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_ecb6461da358b6d8a4f83d611a0" UNIQUE ("discord_id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(254), "is_featured" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."posts_status_enum" AS ENUM('draft', 'archived', 'published')`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(150) NOT NULL, "slug" character varying(254) NOT NULL, "content" text, "cover_image_url" text, "status" "public"."posts_status_enum" NOT NULL DEFAULT 'draft', "is_featured" boolean NOT NULL DEFAULT false, "published_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "author_id" uuid NOT NULL, "category_id" uuid, CONSTRAINT "UQ_2d82eb2bb2ddd7a6bfac8804d8a" UNIQUE ("title"), CONSTRAINT "UQ_54ddf9075260407dcfdd7248577" UNIQUE ("slug"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post_likes" ADD CONSTRAINT "FK_b40d37469c501092203d285af80" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_likes" ADD CONSTRAINT "FK_9b9a7fc5eeff133cf71b8e06a7b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_852f266adc5d67c40405c887b49" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_852f266adc5d67c40405c887b49"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_312c63be865c81b922e39c2475e"`);
        await queryRunner.query(`ALTER TABLE "post_likes" DROP CONSTRAINT "FK_9b9a7fc5eeff133cf71b8e06a7b"`);
        await queryRunner.query(`ALTER TABLE "post_likes" DROP CONSTRAINT "FK_b40d37469c501092203d285af80"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TYPE "public"."posts_status_enum"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
        await queryRunner.query(`DROP TABLE "post_likes"`);
    }

}
