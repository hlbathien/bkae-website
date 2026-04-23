import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_stats_board_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__stats_board_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__stats_board_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_process_flow_nodes_icon" AS ENUM('dot', 'cpu', 'tag', 'pen', 'database', 'send', 'shield', 'git-branch');
  CREATE TYPE "public"."enum_process_flow_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__process_flow_v_version_nodes_icon" AS ENUM('dot', 'cpu', 'tag', 'pen', 'database', 'send', 'shield', 'git-branch');
  CREATE TYPE "public"."enum__process_flow_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__process_flow_v_published_locale" AS ENUM('en');
  CREATE TABLE "stats_board_items_sparkline" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"n" numeric
  );
  
  CREATE TABLE "stats_board_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"suffix" varchar
  );
  
  CREATE TABLE "stats_board_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "stats_board" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_stats_board_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_stats_board_v_version_items_sparkline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"n" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_stats_board_v_version_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_stats_board_v_version_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_stats_board_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__stats_board_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__stats_board_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "process_flow_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_process_flow_nodes_icon" DEFAULT 'dot'
  );
  
  CREATE TABLE "process_flow_nodes_locales" (
  	"label" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "process_flow" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_process_flow_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_process_flow_v_version_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"icon" "enum__process_flow_v_version_nodes_icon" DEFAULT 'dot'
  );
  
  CREATE TABLE "_process_flow_v_version_nodes_locales" (
  	"label" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_process_flow_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__process_flow_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__process_flow_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "home_page_locales" ADD COLUMN "hero_eyebrow" varchar DEFAULT 'Agentic Engineering · HCMUT · Founded 2026';
  ALTER TABLE "home_page_locales" ADD COLUMN "hero_subheadline" varchar;
  ALTER TABLE "home_page_locales" ADD COLUMN "hero_live_band_suffix" varchar DEFAULT 'HCMUT';
  ALTER TABLE "_home_page_v_locales" ADD COLUMN "version_hero_eyebrow" varchar DEFAULT 'Agentic Engineering · HCMUT · Founded 2026';
  ALTER TABLE "_home_page_v_locales" ADD COLUMN "version_hero_subheadline" varchar;
  ALTER TABLE "_home_page_v_locales" ADD COLUMN "version_hero_live_band_suffix" varchar DEFAULT 'HCMUT';
  ALTER TABLE "stats_board_items_sparkline" ADD CONSTRAINT "stats_board_items_sparkline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stats_board_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stats_board_items" ADD CONSTRAINT "stats_board_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stats_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stats_board_items_locales" ADD CONSTRAINT "stats_board_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stats_board_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stats_board_v_version_items_sparkline" ADD CONSTRAINT "_stats_board_v_version_items_sparkline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stats_board_v_version_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stats_board_v_version_items" ADD CONSTRAINT "_stats_board_v_version_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stats_board_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stats_board_v_version_items_locales" ADD CONSTRAINT "_stats_board_v_version_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stats_board_v_version_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "process_flow_nodes" ADD CONSTRAINT "process_flow_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."process_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "process_flow_nodes_locales" ADD CONSTRAINT "process_flow_nodes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."process_flow_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_process_flow_v_version_nodes" ADD CONSTRAINT "_process_flow_v_version_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_process_flow_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_process_flow_v_version_nodes_locales" ADD CONSTRAINT "_process_flow_v_version_nodes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_process_flow_v_version_nodes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "stats_board_items_sparkline_order_idx" ON "stats_board_items_sparkline" USING btree ("_order");
  CREATE INDEX "stats_board_items_sparkline_parent_id_idx" ON "stats_board_items_sparkline" USING btree ("_parent_id");
  CREATE INDEX "stats_board_items_order_idx" ON "stats_board_items" USING btree ("_order");
  CREATE INDEX "stats_board_items_parent_id_idx" ON "stats_board_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "stats_board_items_locales_locale_parent_id_unique" ON "stats_board_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stats_board__status_idx" ON "stats_board" USING btree ("_status");
  CREATE INDEX "_stats_board_v_version_items_sparkline_order_idx" ON "_stats_board_v_version_items_sparkline" USING btree ("_order");
  CREATE INDEX "_stats_board_v_version_items_sparkline_parent_id_idx" ON "_stats_board_v_version_items_sparkline" USING btree ("_parent_id");
  CREATE INDEX "_stats_board_v_version_items_order_idx" ON "_stats_board_v_version_items" USING btree ("_order");
  CREATE INDEX "_stats_board_v_version_items_parent_id_idx" ON "_stats_board_v_version_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_stats_board_v_version_items_locales_locale_parent_id_unique" ON "_stats_board_v_version_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_stats_board_v_version_version__status_idx" ON "_stats_board_v" USING btree ("version__status");
  CREATE INDEX "_stats_board_v_created_at_idx" ON "_stats_board_v" USING btree ("created_at");
  CREATE INDEX "_stats_board_v_updated_at_idx" ON "_stats_board_v" USING btree ("updated_at");
  CREATE INDEX "_stats_board_v_snapshot_idx" ON "_stats_board_v" USING btree ("snapshot");
  CREATE INDEX "_stats_board_v_published_locale_idx" ON "_stats_board_v" USING btree ("published_locale");
  CREATE INDEX "_stats_board_v_latest_idx" ON "_stats_board_v" USING btree ("latest");
  CREATE INDEX "_stats_board_v_autosave_idx" ON "_stats_board_v" USING btree ("autosave");
  CREATE INDEX "process_flow_nodes_order_idx" ON "process_flow_nodes" USING btree ("_order");
  CREATE INDEX "process_flow_nodes_parent_id_idx" ON "process_flow_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "process_flow_nodes_locales_locale_parent_id_unique" ON "process_flow_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "process_flow__status_idx" ON "process_flow" USING btree ("_status");
  CREATE INDEX "_process_flow_v_version_nodes_order_idx" ON "_process_flow_v_version_nodes" USING btree ("_order");
  CREATE INDEX "_process_flow_v_version_nodes_parent_id_idx" ON "_process_flow_v_version_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_process_flow_v_version_nodes_locales_locale_parent_id_uniqu" ON "_process_flow_v_version_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_process_flow_v_version_version__status_idx" ON "_process_flow_v" USING btree ("version__status");
  CREATE INDEX "_process_flow_v_created_at_idx" ON "_process_flow_v" USING btree ("created_at");
  CREATE INDEX "_process_flow_v_updated_at_idx" ON "_process_flow_v" USING btree ("updated_at");
  CREATE INDEX "_process_flow_v_snapshot_idx" ON "_process_flow_v" USING btree ("snapshot");
  CREATE INDEX "_process_flow_v_published_locale_idx" ON "_process_flow_v" USING btree ("published_locale");
  CREATE INDEX "_process_flow_v_latest_idx" ON "_process_flow_v" USING btree ("latest");
  CREATE INDEX "_process_flow_v_autosave_idx" ON "_process_flow_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "stats_board_items_sparkline" CASCADE;
  DROP TABLE "stats_board_items" CASCADE;
  DROP TABLE "stats_board_items_locales" CASCADE;
  DROP TABLE "stats_board" CASCADE;
  DROP TABLE "_stats_board_v_version_items_sparkline" CASCADE;
  DROP TABLE "_stats_board_v_version_items" CASCADE;
  DROP TABLE "_stats_board_v_version_items_locales" CASCADE;
  DROP TABLE "_stats_board_v" CASCADE;
  DROP TABLE "process_flow_nodes" CASCADE;
  DROP TABLE "process_flow_nodes_locales" CASCADE;
  DROP TABLE "process_flow" CASCADE;
  DROP TABLE "_process_flow_v_version_nodes" CASCADE;
  DROP TABLE "_process_flow_v_version_nodes_locales" CASCADE;
  DROP TABLE "_process_flow_v" CASCADE;
  ALTER TABLE "home_page_locales" DROP COLUMN "hero_eyebrow";
  ALTER TABLE "home_page_locales" DROP COLUMN "hero_subheadline";
  ALTER TABLE "home_page_locales" DROP COLUMN "hero_live_band_suffix";
  ALTER TABLE "_home_page_v_locales" DROP COLUMN "version_hero_eyebrow";
  ALTER TABLE "_home_page_v_locales" DROP COLUMN "version_hero_subheadline";
  ALTER TABLE "_home_page_v_locales" DROP COLUMN "version_hero_live_band_suffix";
  DROP TYPE "public"."enum_stats_board_status";
  DROP TYPE "public"."enum__stats_board_v_version_status";
  DROP TYPE "public"."enum__stats_board_v_published_locale";
  DROP TYPE "public"."enum_process_flow_nodes_icon";
  DROP TYPE "public"."enum_process_flow_status";
  DROP TYPE "public"."enum__process_flow_v_version_nodes_icon";
  DROP TYPE "public"."enum__process_flow_v_version_status";
  DROP TYPE "public"."enum__process_flow_v_published_locale";`)
}
