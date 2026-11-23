package domain

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type FixResult struct {
	ID          uuid.UUID
	TicketID    uuid.UUID
	Attempt     int
	Description string
	Links       []string
	Release     string
	AuthorID    uuid.UUID
	SubmittedAt time.Time
}

func NewFixResult(
	ticketID, authorID uuid.UUID,
	attempt int,
	description, release string,
	links []string,
) (*FixResult, error) {
	if len(links) == 0 {
		return nil, errors.New("fix result requires at least one link")
	}
	return &FixResult{
		ID:          uuid.New(),
		TicketID:    ticketID,
		Attempt:     attempt,
		Description: description,
		Links:       links,
		Release:     release,
		AuthorID:    authorID,
		SubmittedAt: time.Now().UTC(),
	}, nil
}
