package domain

import (
	"time"

	"github.com/google/uuid"
)

type FixConfirmation struct {
	ID          uuid.UUID
	FixResultID uuid.UUID
	Comment     *string
	AuthorID    uuid.UUID
	ConfirmedAt time.Time
}

func NewFixConfirmation(
	fixResultID, authorID uuid.UUID,
	comment *string,
) *FixConfirmation {
	return &FixConfirmation{
		ID:          uuid.New(),
		FixResultID: fixResultID,
		Comment:     comment,
		AuthorID:    authorID,
		ConfirmedAt: time.Now().UTC(),
	}
}
