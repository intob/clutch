import { rpc } from "./rpc.js"

export function getWalletInfo() {
  return rpc("getwalletinfo")
}