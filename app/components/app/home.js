import { html, css } from "lit"
import { getNetworkInfo } from "../../util/rpc/network.js"
import { Page } from "../generic/page.js"

class Home extends Page {

  static styles = [
    ...super.styles,
    css`
    `
  ]

  static properties = {
    networkInfo: {}
  }

  async connectedCallback() {
    super.connectedCallback()
    this.networkInfo = await getNetworkInfo()
  }
  
  render() {
    if (!this.networkInfo) {
      return
    }
    return html`
    <h1>Node info</h1>
    <cl-card>
      <h3>Version</h3>
      <cl-pill>${this.networkInfo.subversion}</cl-pill>
      <cl-pill>${this.networkInfo.protocolversion}</cl-pill>
    </cl-card>
    <cl-card>
      <h3>Network</h3>
      <cl-pill>${this.networkInfo.networkactive ? "CONNECTED" : "DISCONNECTED"}</cl-pill>
      <cl-pill><cl-icon name="recv"></cl-icon>${this.networkInfo.connections_in}</cl-pill>
      <cl-pill><cl-icon name="send"></cl-icon>${this.networkInfo.connections_out}</cl-pill>
    </cl-card>
    `
  }
}
customElements.define("cl-home", Home)