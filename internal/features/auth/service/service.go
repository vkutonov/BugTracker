package service

import "context"

type UserRepository interface {
	Register(ctx context.Context, name, email, password string) (string, error)
	Login(ctx context.Context, email, password string) (string, error)
}

type JwtManager interface {
	Createtoken(ctx context.Context, userID string) (string, error)
}

type UserSerice struct {
	userRepository UserRepository
	jwtManager     JwtManager
}

func NewUserService(
	userRepo UserRepository,
	jwtManager JwtManager,
) *UserSerice {
	return &UserSerice{
		userRepository: userRepo,
		jwtManager:     jwtManager,
	}
}
