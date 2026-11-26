CREATE TABLE if NOT EXISTS bugtracker.ticket (
    id UUID PRIMARY KEY,
    version BIGINT DEFAULT 1 NOT NULL,
    project_id UUID REFERENCES bugtracker.project(id) NOT NULL,
    number BIGINt NOT NULL,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(5000) NOT NULL,
    priority VARCHAR(6) NOT NULL CHECK (priority IN ('Low', 'Medium', 'High')),
    status VARCHAR(10) NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'InProgress', 'InReview', 'Resolved')),
    steps VARCHAR(5000) NOT NULL,
    author_id UUID REFERENCES bugtracker.user(id) NOT NULL,
    assigned_id UUID REFERENCES bugtracker.user(id),
    deadline DATE,
    planning_basis VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    UNIQUE (project_id, number)
);