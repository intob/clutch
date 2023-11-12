import { html, css, LitElement } from "lit"
import { getWalletInfo } from "../../util/rpc/wallet.js"

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

    ul {
      padding: 0;
      margin: 0;
      list-style-position: inside;
    }
    `
  ]

  static properties = {
    walletInfo: {}
  }

  async connectedCallback() {
    super.connectedCallback()
    this.walletInfo = (await getWalletInfo()).result
  }
  
  render() {
    return html`
      ${this.walletInfo && this.renderWalletInfo()}
    `
  }

  renderWalletInfo() {
    return html`
      <cl-card>
        <header>
          <h2>${this.walletInfo.walletname}</h2>
        </header>
        <span>Balance ${this.walletInfo.balance}</span>
      </cl-card>
    `
  }
}
customElements.define("cl-home", Home)