import { html, css, LitElement } from "lit"
import { map } from "lit/directives/map.js"
import { listWallets } from "../../../util/rpc/wallet.js"

class NavBar extends LitElement {

  static styles = [
    css`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      z-index: 1;
      border-radius: 0 0 10px 10px;
    }

    .left, .right {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .home {
      font-weight: 600;
      font-size: 1.2em;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      margin-right: 5px;
    }

    span[slot="parent"] {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 10px 20px;
    }

    span[slot="parent"] cl-icon {
      transition: fill 300ms;
      fill: var(--light-color-4);
    }

    span[slot="parent"]:hover cl-icon {
      fill: var(--light-color-2);
    }
    `
  ]

  static properties = {
    wallets: {}
  }

  async connectedCallback() {
    super.connectedCallback()
    this.wallets = await listWallets()
  }
  
  render() {
    return html`
    <div class="left">
      <cl-link href="#/" class="home">
        <span class="logo">[~]</span>
        <span>Clutch</span>
      </cl-link>
      ${map(this.wallets, w => this.renderWalletItem(w))}
    </div>
    <div class="right"></div>
    `
  }

  renderWalletItem(w) {
    return html`
      <cl-link href="#/wallet/${encodeURIComponent(w.name)}/tx">${w.name}</cl-link>
    `
  }
}
customElements.define("cl-nav-bar", NavBar)