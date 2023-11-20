import { html } from "lit";
import { Page } from "../../generic/page.js";

class Create extends Page {
  render() {
    return html`
    <h1>Create wallet</h1>
    `
  }
}
customElements.define("cl-wallet-create", Create)