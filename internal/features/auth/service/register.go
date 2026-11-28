package service

import "context"

func (s *UserSerice) Register(
	ctx context.Context,
	name string,
	email string,
	password string,
) (string, error)