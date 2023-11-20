package main

import (
	"io"
	"net/http"
)

func handleRpc(w http.ResponseWriter, r *http.Request) {
	rpcOrigin := r.Header.Get("RPC_ORIGIN")
	if rpcOrigin == "" {
		rpcOrigin = "http://localhost:8332"
	}

	rpcUser, rpcPassword, _ := r.BasicAuth()

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
