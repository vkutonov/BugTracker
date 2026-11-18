package main

import (
	"context"
	"fmt"
	"os/signal"
	"syscall"
	"time"
)

var Timezone = time.UTC

func main() {
	ctx, cancel := signal.NotifyContext(
		context.Background(),
		syscall.SIGTERM,
		syscall.SIGINT,
	)

	defer cancel()

	for {
		select {
		case <-ctx.Done():
			fmt.Println("Shutdown")
			return
		default:
			time.Sleep(time.Second * 5)
			fmt.Println("Server is working")
		}
	}

}
