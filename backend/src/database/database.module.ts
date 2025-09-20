import { Module, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Module({})
export class DatabaseModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      // Activa la extensión pg_trgm
      await this.dataSource.query('CREATE EXTENSION IF NOT EXISTS pg_trgm;');

      // Crea un índice GIN en las columnas de texto para búsquedas rápidas
      await this.dataSource.query(
        'CREATE INDEX IF NOT EXISTS idx_post_title_trgm ON posts USING GIN (title gin_trgm_ops);',
      );

      await this.dataSource.query(
        'CREATE INDEX IF NOT EXISTS idx_post_content_trgm ON posts USING GIN (content gin_trgm_ops);',
      );

      // Crea un índice GIN para búsqueda de texto completo (to_tsvector)
      await this.dataSource.query(
        "CREATE INDEX IF NOT EXISTS posts_fts_idx ON posts USING GIN (to_tsvector('spanish', title || ' ' || content));",
      );
      console.log('PostgreSQL extensions and indexes created successfully!');
    } catch (error) {
      console.error('Failed to create extensions/indexes:', error);
    }
  }
}
