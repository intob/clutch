import { html } from "lit"
import { Page } from "../../generic/page.js"

class Import extends Page {

  static properties = {
    config: {},
    name: {},
    passphrase: {}
  }

  render() {
    return html`
    <h1>Import wallet</h1>
    <cl-card>
      <cl-input value="" @input=${e => this.name = e.detail.value} placeholder="Name"></cl-input>
      <cl-input value="" @input=${e => this.passphrase = e.detail.value} placeholder="Passphrase"></cl-input>
      <cl-textarea value="" @input=${e => this.config = e.detail.value} placeholder="Config JSON"></cl-textarea>
      <cl-button @click=${this.handleImport}>Import</cl-button>
    </cl-card>
    `
  }

  async handleImport() {
    // import descriptors from config
    const parsed = JSON.parse(this.config)
    console.log(parsed)

    //const resp = importMul

    // create wallet
    //const resp = await createWallet(this.name, this.passphrase)
    //console.log(resp)
  }
}
customElements.define("cl-wallet-import", Import)