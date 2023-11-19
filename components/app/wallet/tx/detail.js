import { css, html } from "lit";
import { Page } from "../../../generic/page.js";
import { getTransaction } from "../../../../util/rpc/tx.js";
import { fmtId } from "../../../../util/fmt.js";
import { map } from "lit/directives/map.js";

class TxDetail extends Page {
  static properties = {
    walletname: {},
    txid: {},
    walletNameDecoded: {},
    tx: {}
  }

  constructor() {
    super()
    this.walletNameDecoded = ""
  }

  async connectedCallback() {
    super.connectedCallback()
    this.walletNameDecoded = decodeURIComponent(this.walletname)
    this.tx = await getTransaction(this.txid)
    console.log(this.tx)
  }

  render() {
    if (!this.tx) {
      return
    }
    return html`
    <header>
      <h1><cl-pill class="tip">Transaction</cl-pill>${fmtId(this.tx.txid)}</h1>
    </header>
    <h2>Outputs</h2>
    ${map(this.tx.details, i => this.renderOutput(i))}
    `
  }

  renderOutput(i) {
    return html`
    <cl-card>
      <cl-icon name=${i.category === "send" ? "sent" : "received"}></cl-icon>
      <span class="mono">${fmtId(i.address)}</span>
      <span class=${parseFloat(i.amount) < 0 ? "outgoing" : ""}>${i.amount}</span>
      <span>${i.label}</span>
    </cl-card>
    `
  }
}
customElements.define("cl-tx-detail", TxDetail)