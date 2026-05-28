-- Projects collection table
-- Run these in Turso SQL console (app.turso.tech) AFTER deploying the code

CREATE TABLE IF NOT EXISTS projects (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  slug text,
  status text DEFAULT 'draft',
  category text,
  year text,
  "order" integer DEFAULT 1,
  hero_image_id integer,
  title text,
  description text,
  location text,
  context text,
  challenge text,
  solution text,
  title_en text,
  description_en text,
  location_en text,
  context_en text,
  challenge_en text,
  solution_en text,
  meta_title text,
  meta_description text,
  meta_title_en text,
  meta_description_en text,
  updated_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  created_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  FOREIGN KEY (hero_image_id) REFERENCES media(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS projects_slug_idx ON projects (slug);

-- Services array table (Payload creates _<collection>_<field> tables for arrays)
CREATE TABLE IF NOT EXISTS projects_services (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  name text,
  FOREIGN KEY (_parent_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Metrics array table
CREATE TABLE IF NOT EXISTS projects_metrics (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  value text,
  label text,
  label_en text,
  FOREIGN KEY (_parent_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Gallery array table
CREATE TABLE IF NOT EXISTS projects_gallery (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  image_id integer,
  caption text,
  FOREIGN KEY (_parent_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (image_id) REFERENCES media(id)
);

-- Payload _projects_rels table for relationships (if needed by Payload)
CREATE TABLE IF NOT EXISTS projects_rels (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "order" integer,
  parent_id integer NOT NULL,
  path text NOT NULL,
  media_id integer,
  FOREIGN KEY (parent_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (media_id) REFERENCES media(id)
);

CREATE INDEX IF NOT EXISTS projects_rels_order_idx ON projects_rels ("order");
CREATE INDEX IF NOT EXISTS projects_rels_parent_idx ON projects_rels (parent_id);
CREATE INDEX IF NOT EXISTS projects_rels_path_idx ON projects_rels (path);
