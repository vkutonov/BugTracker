CREATE TABLE IF NOT EXISTS bugtracker.member_ship (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES bugtracker.user(id),
    project_id UUID NOT NULL REFERENCES bugtracker.project(id),
    role VARCHAR(9) NOT NULL CHECK (role IN ('Owner', 'Developer', 'Tester')),
    joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, project_id)
);

CREATE UNIQUE INDEX member_ship_one_owner_per_project
    ON bugtracker.member_ship (project_id)
    WHERE role = 'Owner';