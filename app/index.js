import { importIcons } from "./util/icon.js"

export const routes = [
  {
    path: "",
    component: "cl-home",
    action: async() => await import("./components/app/home.js")
  },
  {
    path: "wallet/:walletname/:tab", // wallet name is URI encoded
    component: "cl-wallet-detail",
    action: async() => await import("./components/app/wallet/detail.js")
  },
  {
    path: "wallet/:walletname/tx/:txid",
    component: "cl-tx-detail",
    action: async() => await import("./components/app/wallet/tx/detail.js")
  },
  {
    path: "wallet/import",
    component: "cl-wallet-import",
    action: async() => await import("./components/app/wallet/import.js")
  },
  {
    path: "wallet/create",
    component: "cl-wallet-create",
    action: async() => await import("./components/app/wallet/create.js")
  }
]

addEventListener("hashchange", e => {
  sessionStorage.route = new URL(e.newURL).hash
})


importIcons()
// component imports
//
// app
import("./components/app/nav/bar.js")
import("./components/app/nav/dropdown.js")
import("./components/app/wallet/tx/list.js")
import("./components/app/wallet/addr/recv/used.js")
import("./components/app/wallet/addr/recv/unused.js")
// generic
import("./components/generic/button.js")
import("./components/generic/card.js")
import("./components/generic/dialog.js")
import("./components/generic/file-input.js")
import("./components/generic/group.js")
import("./components/generic/icon-button.js")
import("./components/generic/icon-link.js")
import("./components/generic/icon.js")
import("./components/generic/link.js")
import("./components/generic/loader.js")
import("./components/generic/pill.js")
import("./components/generic/router.js")
import("./components/generic/select.js")
import("./components/generic/tabs.js")
import("./components/generic/input.js")
import("./components/generic/label.js")
import("./components/generic/textarea.js")
import("./components/generic/toast.js")
import("./components/generic/tooltip.js")
