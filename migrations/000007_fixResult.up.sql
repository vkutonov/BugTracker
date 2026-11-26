CREATE TABLE IF NOT EXISTS bugtracker.fix_result (
    id UUID PRIMARY KEY,
    ticket_id UUID REFERENCES bugtracker.ticket(id) NOT NULL,
    attempt INTEGER NOT NULL,
    description VARCHAR(1000) NOT NULL,
    links TEXT[] NOT NULL CHECK (cardinality(links) > 0),
    release VARCHAR(100) NOT NULL,
    author_id UUID REFERENCES bugtracker.user(id) NOT NULL,
    submitted_at TIMESTAMP DEFAULT NOW() NOT NULL,
    UNIQUE (ticket_id, attempt)
);