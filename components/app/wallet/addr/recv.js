import { getNewAddr } from "../../../../util/rpc/addr.js";
import { selectWallet } from "../../../../util/rpc/wallet.js";
import { Page } from "../../../generic/page.js";
import { html } from "lit";

class RecvAddr extends Page {
  static properties = {
    walletname: {},
    addr: {}
  }

  async connectedCallback() {
    super.connectedCallback()
    await selectWallet(this.walletname)
    this.addr = await getNewAddr()
  }

  render() {
    return this.addr && this.renderAddr()
  }

  renderAddr() {
    return html`
    <cl-card>
      <span class="mono">${a.address}</span>
      <span>${a.label}</span>
    </cl-card>
    `
  }
}
customElements.define("cl-recv-addr", RecvAddr)