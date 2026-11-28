package repository

import "github.com/vkutonov/BugTracker/internal/core/repository"

type UserRepository struct {
	pool *repository.Pool
}

func NewUserReposiory(pool *repository.Pool) *UserRepository {
	return &UserRepository{
		pool: pool,
	}
}
