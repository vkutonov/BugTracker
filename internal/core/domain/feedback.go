package domain

import (
	"time"

	"github.com/google/uuid"
)

type Feedback struct {
	ID          uuid.UUID
	FixResultID uuid.UUID
	Text        string
	AuthorID    uuid.UUID
	CreatedAt   time.Time
}

func NewFeedback(
	fixResultID, authorID uuid.UUID,
	text string,
) *Feedback {
	return &Feedback{
		ID:          uuid.New(),
		FixResultID: fixResultID,
		Text:        text,
		AuthorID:    authorID,
		CreatedAt:   time.Now().UTC(),
	}
}
