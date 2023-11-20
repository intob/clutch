import { rpc } from "./rpc.js"

export async function listUsedRecvAddr() {
  return (await rpc("listreceivedbyaddress", [1, false, false])).result
}

export async function listUnusedRecvAddr() {
  const addrs = (await rpc("listreceivedbyaddress", [0, true, false])).result
  const unused = addrs.filter(a => a.txids.length === 0)
  let myUnused = []
  for await (const a of unused) {
    const addrInfo = await getAddrInfo(a.address)
    if (addrInfo.ismine === true) {
      myUnused.push(addrInfo)
    }
  }
  return myUnused
}

export async function getNewAddr(label) {
  return rpc("getnewaddress", [label])
}

async function getAddrInfo(addr) {
  return (await rpc("getaddressinfo", [addr])).result
}