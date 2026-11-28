package http

import (
	auth_transport "github.com/vkutonov/BugTracker/internal/features/auth/transport"
)

type Handlers struct {
	auth *auth_transport.AuthHTTPHandler
}

func (s *HTTPServer) Registerroutes(h Handlers) {
	h.auth.RegisterRoutes(s.public.Group("/auth"))
}
