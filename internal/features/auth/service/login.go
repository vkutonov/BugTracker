package service

import "context"

func (s *UserSerice) Login(
	ctx context.Context,
	email string,
	password string,
) (string, error)
