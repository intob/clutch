import { html, css, LitElement } from "lit"
import { getWalletInfo, listWallets } from "../../util/rpc/wallet.js"
import { map } from "lit/directives/map.js"

class Home extends LitElement {

  static styles = [
    css`
    :host {
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }

    cl-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      padding: 20px;
    }

    header {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      width: 100%;
    }

    h2 {
      margin: 0;
    }

    .balance {
      font-size: 1.4em;
    }
    `
  ]

  static properties = {
    wallets: {}
  }

  async connectedCallback() {
    super.connectedCallback()
    this.wallets = await listWallets()
    this.requestUpdate()
  }
  
  render() {
    return html`
      ${this.wallets && this.renderAllCards()}
    `
  }

  renderAllCards() {
    return map(this.wallets, w => this.renderWalletInfo(w))
  }

  renderWalletInfo(w) {
    console.log(w)
    return html`
    <cl-card @click=${() => window.location = `#/wallet/${encodeURIComponent(w.name)}`}>
      <h2>${w.name}</h2>
    </cl-card>
    `
  }
}
customElements.define("cl-home", Home)