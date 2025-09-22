import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostIndexes1758506352589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Activa la extensión pg_trgm
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);

    // Crea índices GIN en columnas de texto
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_post_title_trgm ON posts USING GIN (title gin_trgm_ops);`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_post_content_trgm ON posts USING GIN (content gin_trgm_ops);`,
    );

    // Índice GIN para búsqueda de texto completo
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS posts_fts_idx ON posts USING GIN (to_tsvector('spanish', title || ' ' || content));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir cambios
    await queryRunner.query(`DROP INDEX IF EXISTS posts_fts_idx;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_post_title_trgm;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_post_content_trgm;`);
  }
}
