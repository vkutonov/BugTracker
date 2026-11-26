CREATE TABLE IF NOT EXISTS bugtracker.attachment (
    id UUID PRIMARY KEY,
    ticket_id UUID REFERENCES bugtracker.ticket(id) NOT NULL,
    feedback_id UUID REFERENCES bugtracker.feedback(id),
    file_name VARCHAR(100) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    size bigint NOT NULL,
    storage_key VARCHAR(255) NOT NULL,
    author_id UUID REFERENCES bugtracker.user(id) NOT NULL,
    uploaded_at TIMESTAMP NOT NULL DEFAULT NOW()
);