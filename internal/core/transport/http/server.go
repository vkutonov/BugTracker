package transport_http

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type HTTPServer struct {
	engine     *gin.Engine
	httpServer *http.Server
	public     *gin.RouterGroup
	protected  *gin.RouterGroup
}

func NewHTTPServer(cfg Config, middlewares ...gin.HandlerFunc) *HTTPServer {
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
