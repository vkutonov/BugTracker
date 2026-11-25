package domain

import (
	"time"

	"github.com/google/uuid"
)

type Project struct {
	ID          uuid.UUID
	Code        string
	Name        string
	Description *string
	CreatedAt   time.Time
	UpdatedAt   *time.Time
}

func NewProject(
	code string,
	name string,
	description *string,
) *Project {
	return &Project{
		ID:          uuid.New(),
		Code:        code,
		Name:        name,
		Description: description,
		CreatedAt:   time.Now(),
		UpdatedAt:   nil,
	}
}
