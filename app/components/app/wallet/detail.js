import { css, html } from "lit"
import { Page } from "../../generic/page.js"
import { getWalletInfo } from "../../../util/rpc/wallet.js"

class WalletDetail extends Page {

  static styles = [
    ...super.styles,
    css`
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    .balance {
      font-size: 1.5em;
    }

    .unconfirmed {
      color: var(--signal-color-2);
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
      ${this.renderBalanceUnconfirmed()}
      ${this.renderBalance()}
    </header>
    <cl-tabs selected=${this.tab}>
      <span slot="tab" tab="tx">Transactions</span>
      <span slot="panel" tab="tx">
        ${this.wallet && this.tab === "tx" && this.renderTxList()}
      </span>
      <span slot="tab" tab="used-addr">Used Addresses</span>
      <span slot="panel" tab="used-addr">
        ${this.wallet && this.tab === "used-addr" && this.renderUsedAddrList()}
      </span>
      <span slot="tab" tab="send">Send</span>
      <span slot="panel" tab="send">
      </span>
      <span slot="tab" tab="recv">Receive</span>
      <span slot="panel" tab="recv">
        ${this.wallet && this.tab === "recv" && this.renderRecvAddr()}
      </span>
    </cl-tabs>
    `
  }

  renderBalance() {
    return html`
    <cl-pill class="balance">${this.wallet?.balance}</cl-pill>
    `
  }

  renderBalanceUnconfirmed() {
    if (!this.wallet) {
      return
    }
    if (this.wallet.unconfirmed_balance === 0) {
      return
    }
    return html`
    <cl-pill class="balance unconfirmed">${this.wallet?.unconfirmed_balance}</cl-pill>
    `
  }

  renderTxList() {
    return html`
    <cl-tx-list walletname=${this.walletNameDecoded}></cl-tx-list>
    `
  }

  renderUsedAddrList() {
    return html`
    <cl-used-recv-addr-list walletname=${this.walletNameDecoded}></cl-used-recv-addr-list>
    `
  }

  renderRecvAddr() {
    return html`
    <cl-unused-recv-addr-list walletname=${this.walletNameDecoded}></cl-unused-recv-addr-list>
    `
  }
}
customElements.define("cl-wallet-detail", WalletDetail)