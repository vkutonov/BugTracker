CREATE TABLE If NOT EXISTS bugtracker.fix_confirmation (
    id UUID PRIMARY KEY,
    fix_result_id UUID REFERENCES bugtracker.fix_result(id) UNIQUE NOT NULL,
    comment VARCHAR(255),
    author_id UUID REFERENCES bugtracker.user(id) NOT NULL,
    confirmed_at TIMESTAMP DEFAULT NOW() NOT NULL
);
