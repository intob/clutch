package main

import (
	"flag"
	"fmt"
	"io"
	"net/http"
)

var (
	rpcOrigin   string
	rpcUser     string
	rpcPassword string
)

func init() {
	flag.StringVar(&rpcOrigin, "rpcorigin", "http://127.0.0.1:8332", "Origin of bitcoin rpc server, defaults to http://127.0.0.1:8332")
	flag.StringVar(&rpcUser, "rpcuser", "", "User for bitcoin rpc server")
	flag.StringVar(&rpcPassword, "rpcpassword", "", "Password for bitcoin rpc server")
	flag.Parse()

	fmt.Println("rpc origin: " + rpcOrigin)
	fmt.Println("rpc user: " + rpcUser)
	fmt.Println("rpc password: " + rpcPassword)
	fmt.Println("listening on :6102")
}

func main() {
	http.Handle("/rpc", http.HandlerFunc(handleRpc))
	http.Handle("/", http.FileServer(http.Dir("../")))
	err := http.ListenAndServe(":6102", nil)
	if err != nil {
		fmt.Println("error: " + err.Error())
	}
}

func handleRpc(w http.ResponseWriter, r *http.Request) {
	coreReq, err := http.NewRequest("POST", rpcOrigin, r.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("failed to build request: " + err.Error()))
		return
	}
	if rpcUser != "" && rpcPassword != "" {
		coreReq.SetBasicAuth(rpcUser, rpcPassword)
	}
	resp, err := http.DefaultClient.Do(coreReq)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	body, err := io.ReadAll(resp.Body)
	resp.Body.Close()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("failed to read response body: " + err.Error()))
		return
	}
	if resp.StatusCode != http.StatusOK {
		w.WriteHeader(resp.StatusCode)
		w.Write(body)
		return
	}
	w.Write(body)
}
