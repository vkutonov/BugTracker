package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	UserID   string `json:"user_id"`
	jwt.RegisteredClaims
}

type Manager struct {
	secret     []byte
	accessTTL  time.Duration
	refreshTLL time.Duration
}

func NewManager(cfg Congfig) *Manager {
	return &Manager{
		secret:     []byte(cfg.Secret),
		accessTTL:  cfg.AccessTTL,
		refreshTLL: cfg.RegreshTTL,
	}
}

func (m *Manager) RefreshTTL() time.Duration {
	return m.refreshTLL
}
