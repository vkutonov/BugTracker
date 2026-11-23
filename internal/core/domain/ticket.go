package domain

import (
	"time"

	"github.com/google/uuid"
)

type Ticket struct {
	ID            uuid.UUID
	Version       int64
	ProjectID     uuid.UUID
	Number        int
	Title         string
	Description   string
	Steps         string
	Priority      TicketPriority
	Status        TicketStatus
	AuthorId      uuid.UUID
	AssignedId    *uuid.UUID
	Deadline      *time.Time
	PlanningBasis *string
	CreatedAt     time.Time
	UpdatedAt     *time.Time
}

type TicketStatus string
type TicketPriority string

const (
	Low    TicketPriority = "Low"
	Medium TicketPriority = "Medium"
	High   TicketPriority = "High"

	Open       TicketStatus = "Open"
	InProgress TicketStatus = "InProgress"
	InReview   TicketStatus = "InReview"
	Resolved   TicketStatus = "Resolved"
)

func NewTicket(
	projectID uuid.UUID,
	version int64,
	number int,
	title string,
	description string,
	steps string,
	priority TicketPriority,
	authorId uuid.UUID,
) *Ticket {
	return &Ticket{
		ID:          uuid.New(),
		Version:     version,
		ProjectID:   projectID,
		Number:      number,
		Title:       title,
		Description: description,
		Steps:       steps,
		Priority:    priority,
		Status:      Open,
		AuthorId:    authorId,
	}
}

func (t *Ticket) ChangeTicketStatus(status TicketStatus) {
	t.Status = status
}
