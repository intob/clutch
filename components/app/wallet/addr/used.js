import { map } from "lit/directives/map.js";
import { listReceiveAddr } from "../../../../util/rpc/addr.js";
import { selectWallet } from "../../../../util/rpc/wallet.js";
import { Page } from "../../../generic/page.js";
import { html, css } from "lit";

class UsedAddrList extends Page {
  static properties = {
    walletname: {},
    addrs: {}
  }

  async connectedCallback() {
    super.connectedCallback()
    await selectWallet(this.walletname)
    this.addrs = await listReceiveAddr()
  }

  render() {
    return this.addrs && map(this.addrs, a => this.renderAddr(a))
  }

  renderAddr(a) {
    return html`
    <cl-card>
      <span class="mono">${a.address}</span>
      <span>${a.label}</span>
    </cl-card>
    `
  }
}
customElements.define("cl-used-addr-list", UsedAddrList)