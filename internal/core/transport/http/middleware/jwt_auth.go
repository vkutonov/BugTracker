package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/vkutonov/BugTracker/internal/core/auth"
	"github.com/vkutonov/BugTracker/internal/core/common"
)

func JwtAuthMiddleware(m *auth.Manager) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.Request.Header.Get("Authorization")
		t := strings.Split(authHeader, " ")
		if len(t) == 2 {
			token := t[1]
			claims, err := m.ParseToken(token)
			if err != nil {
				c.JSON(http.StatusUnauthorized, common.ErrUnauthorized)
				c.Abort()
				return
			}
			c.Set("x-user-id", claims.UserID)
			c.Next()
		}
		c.JSON(http.StatusUnauthorized, common.ErrUnauthorized)
		c.Abort()
	}
}
