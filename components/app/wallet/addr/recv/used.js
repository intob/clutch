import { html } from "lit";
import { map } from "lit/directives/map.js";
import { listUsedRecvAddr } from "../../../../../util/rpc/addr.js";
import { selectWallet } from "../../../../../util/rpc/wallet.js";
import { Page } from "../../../../generic/page.js";

class UsedRecvAddrList extends Page {
  static properties = {
    walletname: {},
    addrs: {}
  }

  async connectedCallback() {
    super.connectedCallback()
    await selectWallet(this.walletname)
    this.addrs = await listUsedRecvAddr()
  }

  render() {
    return this.addrs && map(this.addrs, a => this.renderAddr(a))
  }

  renderAddr(a) {
    return html`
    <cl-card>
      <span class="mono">${a.address}</span>
      <cl-pill>${a.label}</cl-pill>
    </cl-card>
    `
  }
}
customElements.define("cl-used-recv-addr-list", UsedRecvAddrList)