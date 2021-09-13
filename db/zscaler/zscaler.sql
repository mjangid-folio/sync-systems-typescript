

BEGIN;
CREATE TABLE IF NOT EXISTS computer_group (
  id UUID NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE computer (
  id UUID NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL unique,
  ip VARCHAR(255) NOT NULL unique,
  -- `references` 👇  sets up the foreign key relation
  group_id UUID NOT NULL references computer_group(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TYPE ptype as ENUM ('computer_policy', 'internal_policy' );

CREATE TABLE policy (
  id serial PRIMARY KEY,
  computer_name text NOT NULL unique,
  allowed_ip text NOT NULL,
  policy_type ptype NOT NULL
);

END;
