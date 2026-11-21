package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func (m *Manager) GenerateToken(
	userID string,
	projects map[string]string,
) (string, error) {
	now := time.Now().UTC()

	claims := Claims{
		UserID:   userID,
		Projects: projects,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(now.Add(m.accessTTL)),
			IssuedAt:  jwt.NewNumericDate(now),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodES256, claims)
	return token.SignedString(m.secret)
}
