package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func (m *Manager) GenerateToken(
	userID string,
) (string, error) {
	now := time.Now().UTC()

	claims := Claims{
		UserID:   userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(now.Add(m.accessTTL)),
			IssuedAt:  jwt.NewNumericDate(now),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(m.secret)
}
