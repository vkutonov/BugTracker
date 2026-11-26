CREATE TABLE IF NOT EXISTS bugtracker.join_request (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES bugtracker.user(id) NOT NULL,
    project_id UUID REFERENCES bugtracker.project(id) NOT NULL,
    status VARCHAR(9) DEFAULT 'Pending' NOT NULL CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Cancelled')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    decided_at TIMESTAMP,
    decided_by_id UUID REFERENCES bugtracker.user(id)
);