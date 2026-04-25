import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts_locales" ADD COLUMN IF NOT EXISTS "body_markdown" varchar;
    ALTER TABLE "_posts_v_locales" ADD COLUMN IF NOT EXISTS "version_body_markdown" varchar;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "body_markdown";
    ALTER TABLE "_posts_v_locales" DROP COLUMN IF EXISTS "version_body_markdown";
  `);
}
