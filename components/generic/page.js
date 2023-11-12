import { css, LitElement } from "lit"

export class Page extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      h1, h2 {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      cl-icon {
        fill: var(--light-color-2);
      }
    `
  ]
}