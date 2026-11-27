package auth

import (
	"fmt"
	"time"

	"github.com/kelseyhightower/envconfig"
)

type Congfig struct {
	Secret     string        `envconfig:"SECRET" required:"true"`
	AccessTTL  time.Duration `envconfig:"ACCESS_TTL" default:"15m"`
	RegreshTTL time.Duration `envconfig:"REFRESH_TTL" default:"720h"`
}

func NewConfig() (Congfig, error) {
	var config Congfig

	if err := envconfig.Process("JWT", &config); err != nil {
		return config, fmt.Errorf("process envconfig process: %w", err)
	}

	return config, nil
}

func NewConfigMust() Congfig {
	config, err := NewConfig()
	if err != nil {
		err = fmt.Errorf("failed to get config:%w", err)
		panic(err)
	}
	return config
}
