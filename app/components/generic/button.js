import { html, css, LitElement } from "lit"

export class Button extends LitElement {
  static get styles() {
    return [
      css`
      button {
        border: 1px solid var(--accent-light-color-1);
        border-radius: 5px;
        background: var(--darken-color-1);
        cursor: pointer;
        color: var(--light-color-2);
        display: flex;
        align-items: center;
        padding: 8px 10px;
        min-width: 84px;
        transition-duration: 300ms;
        transition-property: border-color background-color;
        user-select: none;
        gap: 5px;
      }

      button:hover:not([disabled]) {
        background-color: var(--signal-color-1);
        border-color: var(--signal-color-2);
      }

      button:focus:not([disabled]) {
        outline: 0;
        border-color: var(--signal-color-2);
      }

      button[disabled] {
        color: var(--light-color-4);
      }
      `
    ]
  }

  static properties = {
    disabled: { type: Boolean, attribute: true }
  }

  render() {
    return html`
    <button ?disabled=${this.disabled}><slot></slot></button>
    `
  }
}
customElements.define("cl-button", Button)