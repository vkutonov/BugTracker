package domain

import (
	"time"

	"github.com/google/uuid"
)

type JoinRequest struct {
	ID          uuid.UUID
	UserID      uuid.UUID
	ProjectID   uuid.UUID
	Status      JoinRequestStatus
	CreatedAt   time.Time
	DecidedAt   *time.Time
	DecidedByID *uuid.UUID
}

type JoinRequestStatus string

const (
	JoinRequestPending   JoinRequestStatus = "Pending"
	JoinRequestApproved  JoinRequestStatus = "Approved"
	JoinRequestRejected  JoinRequestStatus = "Rejected"
	JoinRequestCancelled JoinRequestStatus = "Cancelled"
)

func NewJoinRequest(
	userID uuid.UUID,
	projectID uuid.UUID,
	status JoinRequestStatus,
	decidedAt *time.Time,
	decidedByID *uuid.UUID,
) *JoinRequest {
	return &JoinRequest{
		ID:          uuid.New(),
		UserID:      userID,
		ProjectID:   projectID,
		Status:      status,
		CreatedAt:   time.Now(),
		DecidedAt:   decidedAt,
		DecidedByID: decidedByID,
	}
}
