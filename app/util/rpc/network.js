import { rpc } from "./rpc.js"

export async function getNetworkInfo() {
  return (await rpc("getnetworkinfo")).result
}