CREATE SCHEMA IF NOT EXISTS bugtracker;

CREATE TABLE IF NOT EXISTS bugtracker.user (
    id UUID PRIMARY KEY,
    name varchar(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);