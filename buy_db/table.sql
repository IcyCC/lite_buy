create table companys
(
  id              INTEGER not null 
    primary key ,
  name            varchar(128) default '' not null,
  owner           varchar(256) default '' not null,
  tele            varchar(32)  default '' not null,
  detail          varchar(512) default '' not null,
  production_kind varchar(256) default '' not null,
  type            varchar(256)  default '' not null,
  imgs            TEXT          default '' not null,
  productions	    TEXT          default '' not null,
  created_at      TIMESTAMP    default NULL,
  updated_at      TIMESTAMP    default NULL,
  deleted_at      TIMESTAMP    default NULL,
  updated_by      VARCHAR(255) default '' not null,
  created_by      VARCHAR(255) default '' not null
);

create table kinds
(
  id         INTEGER not null
    primary key,
  name       varchar(64)  default '' not null,
  created_at TIMESTAMP    default NULL,
  updated_at TIMESTAMP    default NULL,
  deleted_at TIMESTAMP    default NULL,
  updated_by VARCHAR(255) default '' not null,
  created_by VARCHAR(255) default '' not null
);

create table results
(
  id              INTEGER not null
    primary key,
  company_id      int not null,
  type            varchar(32)  default '' not null,
  production_type varchar(32)  default '' not null,
  content         TEXT          default '' not null,
  comment   	    TEXT          default '' not null,
  created_at      TIMESTAMP    default NULL,
  updated_at      TIMESTAMP    default NULL,
  deleted_at      TIMESTAMP    default NULL,
  updated_by      VARCHAR(255) default '' not null,
  created_by      VARCHAR(255) default '' not null
);

CREATE TABLE experts (
	id	INTEGER NOT NULL,
	name	varchar(128) NOT NULL DEFAULT '',
	tele	varchar(32) NOT NULL DEFAULT '',
	note	varchar(512) NOT NULL DEFAULT '',
	skilled_in	TEXT NOT NULL DEFAULT '',
	created_at	TIMESTAMP DEFAULT NULL,
	updated_at	TIMESTAMP DEFAULT NULL,
	deleted_at	TIMESTAMP DEFAULT NULL,
	updated_by	VARCHAR(255) NOT NULL DEFAULT '',
	created_by	VARCHAR(255) NOT NULL DEFAULT '',
	PRIMARY KEY(id)
)

CREATE TABLE productions (
	id	INTEGER NOT NULL,
	name	varchar(128) NOT NULL DEFAULT '',
	detail	varchar(512) NOT NULL DEFAULT '',
	production_kind	varchar(256) NOT NULL DEFAULT '',
	imgs	TEXT NOT NULL DEFAULT '',
	created_at	TIMESTAMP DEFAULT NULL,
	updated_at	TIMESTAMP DEFAULT NULL,
	deleted_at	TIMESTAMP DEFAULT NULL,
	updated_by	VARCHAR(255) NOT NULL DEFAULT '',
	created_by	VARCHAR(255) NOT NULL DEFAULT '',
	PRIMARY KEY(id)
)

CREATE TABLE employments (
	id	INTEGER NOT NULL,
	expert_id	int NOT NULL,
	content	TEXT NOT NULL DEFAULT '',
	comment	TEXT NOT NULL DEFAULT '',
	created_at	TIMESTAMP DEFAULT NULL,
	updated_at	TIMESTAMP DEFAULT NULL,
	deleted_at	TIMESTAMP DEFAULT NULL,
	updated_by	VARCHAR(255) NOT NULL DEFAULT '',
	created_by	VARCHAR(255) NOT NULL DEFAULT '',
	PRIMARY KEY(id)
)