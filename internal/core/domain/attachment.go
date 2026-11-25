package domain

import (
	"time"

	"github.com/google/uuid"
)

type Attachment struct {
	ID          uuid.UUID
	TicketID    uuid.UUID
	FeedbackID  *uuid.UUID
	FileName    string
	ContentType string
	Size        int64
	StorageKey  string
	AuthorID    uuid.UUID
	UploadedAt  time.Time
}

func NewAttachment(
	ticketID, authorID uuid.UUID,
	feedbackID *uuid.UUID,
	fileName, contentType string,
	data []byte,
) *Attachment {
	return &Attachment{
		ID:          uuid.New(),
		TicketID:    ticketID,
		FeedbackID:  feedbackID,
		FileName:    fileName,
		ContentType: contentType,
		Size:        int64(len(data)),
		AuthorID:    authorID,
		UploadedAt:  time.Now().UTC(),
	}
}
