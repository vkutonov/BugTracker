CREATE TABLE IF NOT EXISTS bugtracker.feedback (
    id UUID PRIMARY KEY,
    fix_result UUID REFERENCES bugtracker.fix_result(id) UNIQUE NOT NULL,
    back_text TEXT NOT NULL,
    author_id UUID REFERENCES bugtracker.user(id) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);