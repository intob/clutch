import { css, html } from "lit";
import { Page } from "../../generic/page.js";
import { getWalletInfo } from "../../../util/rpc/wallet.js";

class WalletDetail extends Page {

  static styles = [
    ...super.styles,
    css`
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .balance {
      font-size: 1.5em;
    }
    `
  ]

  static properties = {
    walletname: {},
    walletNameDecoded: {},
    wallet: {},
    tab: {}
  }

  constructor() {
    super()
    this.walletNameDecoded = ""
  }

  async connectedCallback() {
    super.connectedCallback()
    this.walletNameDecoded = decodeURIComponent(this.walletname)
    this.wallet = await getWalletInfo(this.walletNameDecoded)
  }

  render() {
    return html`
    <header>
      <h1><cl-pill class="tip">Wallet</cl-pill>${decodeURIComponent(this.walletname)}</h1>
      <cl-pill class="balance">${this.wallet?.balance} BTC</cl-pill>
    </header>
    <cl-tabs selected=${this.tab}>
      <span slot="tab" tab="tx">Transactions</span>
      <span slot="panel" tab="tx">
        ${this.wallet && this.tab === "tx" && this.renderTxs()}
      </span>
      <span slot="tab" tab="used-addrs">Used Addresses</span>
      <span slot="panel" tab="used-addrs">
        ${this.wallet && this.tab === "used-addrs" && this.renderAddrs()}
      </span>
      <span slot="tab" tab="send">Send</span>
      <span slot="panel" tab="send">
      </span>
      <span slot="tab" tab="receive">Receive</span>
      <span slot="panel" tab="receive">
      </span>
    </cl-tabs>
    `
  }

  renderTxs() {
    return html`
    <cl-tx-list walletname=${this.walletNameDecoded}></cl-tx-list>
    `
  }

  renderAddrs() {
    return html`
    <cl-used-addr-list walletname=${this.walletNameDecoded}></cl-used-addr-list>
    `
  }
}
customElements.define("cl-wallet-detail", WalletDetail)