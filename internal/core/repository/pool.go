package repository

import (
	"context"
	"fmt"
	"net"
	"net/url"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Pool struct {
	*pgxpool.Pool
	opTimeout time.Duration
}

func NewPool(
	ctx context.Context,
	config Config,
) (*Pool, error) {
	connString := url.URL{
		Scheme:   "postgres",
		User:     url.UserPassword(config.User, config.Password),
		Host:     net.JoinHostPort(config.Host, config.Port),
		Path:     config.Database,
		RawQuery: "sslmode=disable",
	}

	pgxConfig, err := pgxpool.ParseConfig(connString.String())
	if err != nil {
		return nil, fmt.Errorf("Failed to parse pgxconfig:%w", err)
	}

	pool, err := pgxpool.NewWithConfig(ctx, pgxConfig)
	if err != nil {
		return nil, fmt.Errorf("Failed to create pgxpool:%w", err)
	}

	pingCtx, cancel := context.WithTimeout(ctx, config.Timeout)
	defer cancel()

	if err := pool.Ping(pingCtx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("Failed to ping to pgxpool:%w", err)
	}

	return &Pool{
		Pool:      pool,
		opTimeout: config.Timeout,
	}, nil

}

func (p *Pool) GetOpTimeout() time.Duration {
	return p.opTimeout
}
