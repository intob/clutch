package main

import (
	"fmt"
	"net/http"
	"os/exec"

	"fyne.io/systray"
	"github.com/intob/clutch/daemon/icon"
)

func main() {
	systray.Run(onReady, func() {})
}

func onReady() {
	systray.SetIcon(icon.Data)
	systray.SetTitle("Clutch")
	systray.SetTooltip("Tiny bitcoin wallet")
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
	http.Handle("/", http.FileServer(http.Dir("../app")))
	err := http.ListenAndServe(":6102", nil)
	if err != nil {
		fmt.Println("error: " + err.Error())
	}
}
