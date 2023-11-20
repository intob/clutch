import { css, html } from "lit";
import { map } from "lit/directives/map.js";
import { Page } from "../../../generic/page.js";
import { listTx } from "../../../../util/rpc/tx.js";
import { fmtDate, fmtId } from "../../../../util/fmt.js"

class TxList extends Page {
  static styles = [
    ...super.styles,
    css`
    cl-card {
      cursor: pointer;
    }

    cl-card:hover {
      border-color: var(--signal-color-1)
    }
    `
  ]

  static properties = {
    walletname: {},
    txs: {}
  }

  async connectedCallback() {
    super.connectedCallback()
    this.txs = await listTx(this.walletname)
  }

  render() {
    return map(this.txs, tx => this.renderTx(tx))
  }
  
  renderTx(tx) {
    return html`
    <cl-card @click=${() => window.location = `#/wallet/${encodeURIComponent(this.walletname)}/tx/${tx.txid}`}>
      <cl-icon name=${tx.category === "send" ? "send" : "recv"}></cl-icon>
      <span>${fmtDate(tx.blocktime)}</span>
      <span class="mono">${fmtId(tx.txid)}</span>
      <span class=${parseFloat(tx.amount) < 0 ? "outgoing" : ""}>${tx.amount}</span>
      <span>${tx.confirmations}</span>
      <cl-pill><cl-icon name="label"></cl-icon>${tx.label}</cl-pill>
    </cl-card>
    `
  }
}
customElements.define("cl-tx-list", TxList)