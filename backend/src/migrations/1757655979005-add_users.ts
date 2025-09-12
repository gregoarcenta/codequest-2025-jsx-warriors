import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsers1757655979005 implements MigrationInterface {
    name = 'AddUsers1757655979005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "discord_id" character varying(50), "full_name" character varying(150) NOT NULL, "email" character varying(254) NOT NULL, "password" character varying(60), "avatar_url" character varying(254), "bio" character varying(254), "posts_count" integer NOT NULL DEFAULT '0', "likes_count" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{user}', "last_login_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_ecb6461da358b6d8a4f83d611a0" UNIQUE ("discord_id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
    }

}
