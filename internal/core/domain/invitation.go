package domain

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"time"

	"github.com/google/uuid"
)

type Invitation struct {
	ID          uuid.UUID
	ProjectID   uuid.UUID
	TokenHash   string
	CreatedByID uuid.UUID
	ExpiresAt   time.Time
}

func NewInvitation(
	projectID uuid.UUID,
	createdByID uuid.UUID,
) (*Invitation, string) {
	token := rand.Text()

	return &Invitation{
		ID:          uuid.New(),
		ProjectID:   projectID,
		CreatedByID: createdByID,
		TokenHash:   HashInvitationToken(token),
		ExpiresAt:   time.Now().Add(7 * 24 * time.Hour),
	}, token
}

func HashInvitationToken(token string) string {
	hash := sha256.Sum256([]byte(token))
	return hex.EncodeToString(hash[:])
}
