package main

import (
	"fmt"
	"net/http"

	"fyne.io/systray"
)

func main() {
	systray.Run(onReady, func() {})
}

func onReady() {
	systray.SetTitle("Clutch")
	systray.SetTooltip("Tiny bitcoin wallet")
	addQuitItem()
	serve()
}

func addQuitItem() {
	mQuit := systray.AddMenuItem("Quit", "Quit the whole app")
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
