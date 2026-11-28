package transport

import "context"

type AuthService interface {
	Register(ctx context.Context, name, email, password string) (string, error)
	Login(ctx context.Context, email, password string) (string, error)
}

type AuthHTTPHandler struct {
	authService AuthService
}

func NewAuthHTTPHandler(authService AuthService) *AuthHTTPHandler {
	return &AuthHTTPHandler{
		authService: authService,
	}
}
