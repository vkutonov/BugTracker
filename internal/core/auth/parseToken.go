package auth

import (
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/vkutonov/BugTracker/internal/core/common"
)

func (m *Manager) ParseToken(tokenStr string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(
		tokenStr,
		&Claims{},
		func(t *jwt.Token) (interface{}, error) {
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method :%v", t.Header["alsg"])
			}
			return m.secret, nil
		})
	if err != nil {
		return nil, err
	}

	Claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, common.ErrUnauthorized
	}

	return Claims, nil
}
