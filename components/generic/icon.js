import { css, LitElement } from "lit"
import { unsafeHTML } from "lit/directives/unsafe-html.js"

class Icon extends LitElement {
  static styles = css`
    :host {
      height: 24px;
      width: 24px;
    }

    svg {
      fill: inherit;
      display: block;
    }
  `

  static properties = {
    name: { attribute: true }
  }

  render() {
    return unsafeHTML(window.icons[this.name])
  }
}
customElements.define("cl-icon", Icon)