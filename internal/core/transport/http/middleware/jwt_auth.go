package middleware

import (
	"errors"
	"os/user"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/vkutonov/BugTracker/internal/core/auth"
)

func JwtAuthMiddleware(secret string) gin.HandlerFunc {
	return func (c *gin.Context) {
		authHeader := c.Request.Header.Get("Authorization")
		t := strings.Split(authHeader, " ")
		if len(t) == 2 {
			authToken := t[1]
			userID, errors := 
		}
	}
}