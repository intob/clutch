import { html, css } from "lit"
import { Button } from "./button.js"

export class IconButton extends Button {
  static styles = [
    ...super.styles,
    css`
    cl-icon {
      fill: var(--light-color-2);
    }

    button:hover cl-icon {
      fill: var(--light-color-2);
    }

    button[disabled] cl-icon, button[disabled]:hover cl-icon {
      fill: var(--light-color-4);
    }
    ` 
  ]

  static properties = {
    ...super.properties,
    icon: { attribute: true }
  }

  render() {
    return html`
    <button ?disabled=${this.disabled}><cl-icon name=${this.icon}></cl-icon><slot></slot></button>
    `
  }
}
customElements.define("icon-button", IconButton)