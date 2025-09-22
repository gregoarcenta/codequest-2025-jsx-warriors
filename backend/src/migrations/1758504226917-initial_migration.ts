import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1758504226917 implements MigrationInterface {
    name = 'InitialMigration1758504226917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(254), "is_featured" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment_likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_2c299aaf1f903c45ee7e6c7b419" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "is_visible" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "post_id" uuid NOT NULL, "author_id" uuid NOT NULL, "parent_id" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_comments_post_id" ON "comments" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "idx_comments_parent_id" ON "comments" ("parent_id") `);
        await queryRunner.query(`CREATE TABLE "bookmarks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "post_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7f976ef6cecd37a53bd11685f32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "post_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_e4ac7cb9daf243939c6eabb2e0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."posts_status_enum" AS ENUM('draft', 'archived', 'published')`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(150) NOT NULL, "slug" character varying(254) NOT NULL, "content" text, "cover_image_url" text, "status" "public"."posts_status_enum" NOT NULL DEFAULT 'draft', "is_featured" boolean NOT NULL DEFAULT false, "views_count" integer NOT NULL DEFAULT '0', "published_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "author_id" uuid NOT NULL, "category_id" uuid, CONSTRAINT "UQ_2d82eb2bb2ddd7a6bfac8804d8a" UNIQUE ("title"), CONSTRAINT "UQ_54ddf9075260407dcfdd7248577" UNIQUE ("slug"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "discord_id" character varying(50), "full_name" character varying(150) NOT NULL, "email" character varying(254) NOT NULL, "password" character varying(60), "avatar_url" text, "bio" character varying(254), "is_active" boolean NOT NULL DEFAULT true, "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{user}', "last_login_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_ecb6461da358b6d8a4f83d611a0" UNIQUE ("discord_id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_view_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ip" character varying(64), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "post_id" uuid NOT NULL, "user_id" uuid, CONSTRAINT "PK_7b2391cf49db8260561d3c5dc82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "password_reset_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "jwt_id" uuid NOT NULL, "is_used" boolean NOT NULL DEFAULT false, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "used_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d16bebd73e844c48bca50ff8d3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5152c32194f2bd7d63106e8498" ON "password_reset_tokens" ("jwt_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7c038e5a589b06cbe4320cc88b" ON "password_reset_tokens" ("expires_at") `);
        await queryRunner.query(`ALTER TABLE "comment_likes" ADD CONSTRAINT "FK_2073bf518ef7017ec19319a65e5" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_likes" ADD CONSTRAINT "FK_bdba9a10c64ff58d36b09e3ac45" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_d6f93329801a93536da4241e386" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_51f539993ae903a927bd44dbe49" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_58a0fbaee65cd8959a870ee678c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_likes" ADD CONSTRAINT "FK_b40d37469c501092203d285af80" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_likes" ADD CONSTRAINT "FK_9b9a7fc5eeff133cf71b8e06a7b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_852f266adc5d67c40405c887b49" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_view_logs" ADD CONSTRAINT "FK_56017441897bf3563cdd6074d67" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_view_logs" ADD CONSTRAINT "FK_45e3e669ae003a3ae2b4d2fd726" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "FK_52ac39dd8a28730c63aeb428c9c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_reset_tokens" DROP CONSTRAINT "FK_52ac39dd8a28730c63aeb428c9c"`);
        await queryRunner.query(`ALTER TABLE "post_view_logs" DROP CONSTRAINT "FK_45e3e669ae003a3ae2b4d2fd726"`);
        await queryRunner.query(`ALTER TABLE "post_view_logs" DROP CONSTRAINT "FK_56017441897bf3563cdd6074d67"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_852f266adc5d67c40405c887b49"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_312c63be865c81b922e39c2475e"`);
        await queryRunner.query(`ALTER TABLE "post_likes" DROP CONSTRAINT "FK_9b9a7fc5eeff133cf71b8e06a7b"`);
        await queryRunner.query(`ALTER TABLE "post_likes" DROP CONSTRAINT "FK_b40d37469c501092203d285af80"`);
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_58a0fbaee65cd8959a870ee678c"`);
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_51f539993ae903a927bd44dbe49"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_d6f93329801a93536da4241e386"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"`);
        await queryRunner.query(`ALTER TABLE "comment_likes" DROP CONSTRAINT "FK_bdba9a10c64ff58d36b09e3ac45"`);
        await queryRunner.query(`ALTER TABLE "comment_likes" DROP CONSTRAINT "FK_2073bf518ef7017ec19319a65e5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7c038e5a589b06cbe4320cc88b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5152c32194f2bd7d63106e8498"`);
        await queryRunner.query(`DROP TABLE "password_reset_tokens"`);
        await queryRunner.query(`DROP TABLE "post_view_logs"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TYPE "public"."posts_status_enum"`);
        await queryRunner.query(`DROP TABLE "post_likes"`);
        await queryRunner.query(`DROP TABLE "bookmarks"`);
        await queryRunner.query(`DROP INDEX "public"."idx_comments_parent_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_comments_post_id"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "comment_likes"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
