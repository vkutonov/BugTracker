CREATE TABLE IF NOT EXISTS bugtracker.invitation (
    id UUID PRIMARY KEY,
    project_id UUID REFERENCES bugtracker.project(id) NOT NULL,
    token_hash VARCHAR(255) UNIQUE NOT NULL,
    created_by_id UUID REFERENCES bugtracker.user(id) NOT NULL,
    expires_at TIMESTAMP NOT NULL
);