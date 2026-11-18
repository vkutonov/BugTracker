package repository

import (
	"fmt"
	"time"

	"github.com/kelseyhightower/envconfig"
)

type Config struct {
	Host     string        `envconfig:"HOST" required:true`
	Port     string        `envconfig:"PORT" default:5432`
	User     string        `envconfig:"USER" required:true`
	Password string        `envconfig:"PASSWORD" required:true`
	Database string        `envconfig:"DATABASE" required:true`
	Timeout  time.Duration `envconfig:"TIMEOUT" required:true`
}

func NewConfig() (Config, error) {
	var config Config
	if err := envconfig.Process("POSTGRES", &config); err != nil {
		return config, fmt.Errorf("Failed to process env config:%w", err)
	}
	return config, nil
}

func NewMustConfig() Config {
	config, err := NewConfig()
	if err != nil {
		err = fmt.Errorf("Failed to load postgres config:%w", err)
		panic(err)
	}
	return config
}
