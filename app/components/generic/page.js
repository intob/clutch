import { css, LitElement } from "lit"

export class Page extends LitElement {
  static styles = [
    css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    h1, h2 {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    cl-icon {
      fill: var(--light-color-2);
    }

    cl-icon.outgoing {
      fill: var(--status-red-color);
    }

    .mono {
      font-family: monospace;
    }

    .tip {
      font-size: .4em;
    }

    .outgoing {
      color: var(--status-red-color);
    }
    `
  ]
}