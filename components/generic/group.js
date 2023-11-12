import { html, css, LitElement } from "lit"

class Group extends LitElement {
  static styles = css`
  div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
  }

  div.row {
    flex-direction: row;
  }
  `

  static properties = {
    row: { type: Boolean }
  }

  render() {
    return html`
    <div class="${this.row ? "row" : ""}">
      <slot></slot>
    </div>
    `
  }
}
customElements.define("cl-group", Group)