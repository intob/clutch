import { Loader } from "../../components/generic/loader.js"

export async function rpc(method, params) {
  const job = crypto.randomUUID()
  Loader.setProgress(job, .3)
  const resp = await fetch(`${window.origin}/rpc`, {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "1.0",
      id: job,
      method: method,
      params: params
    }),
    headers: {
      authorization: 'Basic ' + btoa(localStorage.rpcUser + ":" + localStorage.rpcPassword)
    }
  })
  Loader.setProgress(job, 1)
  if (!resp.ok) { 
    return
  }
  return resp.json()
}