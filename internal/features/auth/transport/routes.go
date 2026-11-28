package transport

import "github.com/gin-gonic/gin"

func (h *AuthHTTPHandler) RegisterRoutes(g *gin.RouterGroup) {
	g.POST("/register", h.Register)
	g.GET("/login", h.Login)
}
