import { html } from "lit";
import { map } from "lit/directives/map.js";
import { selectWallet } from "../../../../../util/rpc/wallet.js";
import { Page } from "../../../../generic/page.js";
import { listUnusedRecvAddr } from "../../../../../util/rpc/addr.js";

class UnusedRecvAddrList extends Page {
  static properties = {
    walletname: {},
    unusedAddrs: {}
  }

  async connectedCallback() {
    super.connectedCallback()
    await selectWallet(this.walletname)
    this.unusedAddrs = await listUnusedRecvAddr()
  }

  render() {
    return html`
    ${map(this.unusedAddrs, a => this.renderUnusedAddr(a))}
    `
  }

  renderUnusedAddr(a) {
    console.log(a)
    return html`
    <cl-card>
      <span class="mono">${a.address}</span>
      ${map(a.labels, l => this.renderLabel(l))}
    </cl-card>
    `
  }

  renderLabel(l) {
    if (l === "") {
      return
    }
    return html`
    <cl-pill><cl-icon name="label"></cl-icon>${l}</cl-pill>
    `
  }
}
customElements.define("cl-unused-recv-addr-list", UnusedRecvAddrList)