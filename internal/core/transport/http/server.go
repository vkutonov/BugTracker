package http

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type HTTPServer struct {
	engine     *gin.Engine
	httpServer *http.Server
	public     *gin.RouterGroup
	protected  *gin.RouterGroup
}

func NewHTTPServer(cfg Config, middlewares ...gin.HandlerFunc) *HTTPServer {
	gin.SetMode(cfg.Mode)
	r := gin.New()

	r.Use(
		gin.Logger(),
		gin.Recovery(),
	)

	api := r.Group("/api/v1")
	public := api.Group("")
	protected := api.Group("")

	protected.Use(middlewares...)

	return &HTTPServer{
		engine:    r,
		public:    public,
		protected: protected,
		httpServer: &http.Server{
			Addr:         cfg.Addr,
			ReadTimeout:  cfg.ReadTimeout,
			WriteTimeout: cfg.WriteTimeout,
			Handler:      r,
		},
	}

}

func (s *HTTPServer) Start(ctx context.Context) error {
	errCh := make(chan error, 1)

	go func() {
		errCh <- s.httpServer.ListenAndServe()
	}()
	defer close(errCh)

	for {
		select {
		case err := <-errCh:
			if !errors.Is(err, http.ErrServerClosed) {
				err = fmt.Errorf("failed to server start:%w", err)
				return err
			}
		case <-ctx.Done():
			shutdownCtx, cancel := context.WithTimeout(ctx, 10*time.Second)
			defer cancel()

			if err := s.httpServer.Shutdown(shutdownCtx); err != nil {
				err := s.httpServer.Close()
				return err
			}

			return nil
		}
	}
}
