import { rpc } from "./rpc.js"
import { selectWallet } from "./wallet.js"

export async function listTx(walletName) {
  await selectWallet(walletName)
  return (await rpc("listtransactions")).result
}

export async function getTransaction(txId) {
  return (await rpc("gettransaction", [txId])).result
}