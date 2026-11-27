package main

import (
	"context"
	"os/signal"
	"syscall"
	"time"

	"github.com/vkutonov/BugTracker/internal/core/auth"
	transport_http "github.com/vkutonov/BugTracker/internal/core/transport/http"
	"github.com/vkutonov/BugTracker/internal/core/transport/http/middleware"
)

var Timezone = time.UTC

func main() {
	ctx, cancel := signal.NotifyContext(
		context.Background(),
		syscall.SIGTERM,
		syscall.SIGINT,
	)
	defer cancel()

	server := transport_http.NewHTTPServer(
		transport_http.NewConfigMust(),
		middleware.JwtAuthMiddleware(auth.NewManager(auth.NewConfigMust())),
	)

	server.Start(ctx)

}
