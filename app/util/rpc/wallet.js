import { rpc } from "./rpc.js"

export async function listWallets() {
  return (await rpc("listwalletdir")).result.wallets
}

export async function getWalletInfo(name) {
  await selectWallet(name)
  return (await rpc("getwalletinfo")).result
}

export async function selectWallet(name) {
  if (sessionStorage.selectedWallet === name) {
    return
  }

  // unload other wallets
  let loaded = false
  const openWallets = await listOpenWallets()
  for await (const ow of openWallets) {
    if (ow === name) {
      loaded = true
      continue
    }
    await unloadWallet(ow)
  }

  if (!loaded) {
    await loadWallet(name)
  }

  sessionStorage.selectedWallet = name
}

async function listOpenWallets() {
  return (await rpc("listwallets")).result
}

async function loadWallet(name) {
  return rpc("loadwallet", [ name ])
}

async function unloadWallet(name) {
  return rpc("unloadwallet", [ name ])
}
