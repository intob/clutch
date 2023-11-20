import { html, css } from "lit"
import { getNetworkInfo } from "../../../util/rpc/network.js"
import { Page } from "../../generic/page.js"

class Settings extends Page {

  static styles = [
    ...super.styles,
    css`
    `
  ]

  static properties = {
    rpcOrigin: {},
    rpcUser: {},
    rpcPassword: {},
  }

  async connectedCallback() {
    super.connectedCallback()
    this.rpcOrigin = localStorage.rpcOrigin || ""
    this.rpcUser = localStorage.rpcUser || ""
    this.rpcPassword = localStorage.rpcPassword || ""
  }
  
  render() {
    return html`
    <h1>Settings</h1>
    <cl-card>
      <h3>RPC</h3>
      <cl-input placeholder="origin" .value=${this.rpcOrigin} @input=${e => this.rpcOrigin = e.detail.value}></cl-input>
      <cl-input placeholder="user" .value=${this.rpcUser} @input=${e => this.rpcUser = e.detail.value}></cl-input>
      <cl-input placeholder="password" type="password" .value=${this.rpcPassword} @input=${e => this.rpcPassword = e.detail.value}></cl-input>
    </cl-card>
    `
  }

  update() {
    super.update()
    console.log("update")
    localStorage.rpcOrigin = this.rpcOrigin
    localStorage.rpcUser = this.rpcUser
    localStorage.rpcPassword = this.rpcPassword
  }
}
customElements.define("cl-settings", Settings)