package main

import (
	"embed"
	"os"
	"os/signal"
	"syscall"

	"github.com/fengjx/luchen"
)

//go:embed ui
var staticFS embed.FS

func main() {
	httpSvr := luchen.NewHTTPServer(
		luchen.WithServiceName("lc-kit-web"),
		luchen.WithServerAddr(":8000"),
	).StaticFS("/", luchen.OnlyFilesFS(staticFS, false, "ui"))
	luchen.Start(httpSvr)

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)

	<-quit
	luchen.Stop()
}
