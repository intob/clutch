import { rpc } from "./rpc.js"

export async function getNewAddr(label) {
  return rpc("getnewaddress", [label])
}

export async function listReceiveAddr() {
  return (await rpc("listreceivedbyaddress", [1, false])).result
}