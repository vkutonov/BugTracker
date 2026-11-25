package domain

import (
	"time"

	"github.com/google/uuid"
)

type Membership struct {
	ID        uuid.UUID
	UserID    uuid.UUID
	ProjectID uuid.UUID
	Role      MembershipRole
	JoinedAt  time.Time
}

type MembershipRole string

const (
	Owner     MembershipRole = "Owner"
	Developer MembershipRole = "Developer"
	Tester    MembershipRole = "Tester"
)

func NewMembership(
	userID uuid.UUID,
	projectID uuid.UUID,
	role MembershipRole,
) *Membership {
	return &Membership{
		ID:        uuid.New(),
		UserID:    userID,
		ProjectID: projectID,
		Role:      role,
		JoinedAt:  time.Now(),
	}
}
