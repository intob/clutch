package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"path"

	"fyne.io/systray"
	"github.com/intob/clutch/daemon/icon"
)

var (
	appDir string
	dev    bool
)

func init() {
	execPath, err := os.Executable()
	if err != nil {
		fmt.Println("failed to get working directory: " + err.Error())
		os.Exit(1)
	}

	appDirDefault := path.Join(path.Dir(execPath), "app")

	flag.StringVar(&appDir, "appdir", appDirDefault, "Directory of webapp files")
	flag.BoolVar(&dev, "dev", false, "Output debugging info")
	flag.Parse()

	if dev {
		fmt.Println("serving app from: " + appDir)
		fmt.Println("listening on :6102")
	}
}

func main() {
	systray.Run(onReady, func() {})
}

func onReady() {
	systray.SetIcon(icon.Data)
	systray.SetTitle("Clutch")
	addOpenItem()
	addQuitItem()
	serve()
}

func addOpenItem() {
	mOpen := systray.AddMenuItem("Open", "Open the wallet")
	mOpen.Enable()
	go func() {
		for {
			<-mOpen.ClickedCh
			cmd := exec.Command("open", "http://localhost:6102")
			cmd.Run()
		}
	}()
	systray.AddSeparator()
}

func addQuitItem() {
	mQuit := systray.AddMenuItem("Quit", "Quit the Clutch app")
	mQuit.Enable()
	go func() {
		<-mQuit.ClickedCh
		systray.Quit()
	}()
	systray.AddSeparator()
}

func serve() {
	http.Handle("/rpc", http.HandlerFunc(handleRpc))
	http.Handle("/", http.FileServer(http.Dir(appDir)))
	err := http.ListenAndServe(":6102", nil)
	if err != nil {
		fmt.Println("error: " + err.Error())
		os.Exit(1)
	}
}
