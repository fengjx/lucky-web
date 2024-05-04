package main

import (
	"os"
	"os/signal"
	"syscall"

	"github.com/fengjx/luchen"
)

func main() {
	httpSvr := luchen.NewHTTPServer(
		luchen.WithServiceName("lc-kit-web"),
		luchen.WithServerAddr(":8000"),
	).Static("/", "ui")
	luchen.Start(httpSvr)

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)

	<-quit
	luchen.Stop()
}
