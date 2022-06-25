import { CSSResult, html, LitElement, property, TemplateResult } from 'lit-element';
import styles from './styles';

const iconStore: Map<string, string> = new Map();

export class JupiterIconElement extends LitElement {
  static get tag(): string {
    return 'jupiter-icon';
  }

  static get styles(): CSSResult[] {
    return [styles];
  }

  static addIconsToStore(folderName: string, path: string): void {
    path = path.endsWith('/') ? path.substring(0, path.length - 1) : path;

    if (!iconStore.has(folderName)) {
      iconStore.set(folderName, path);
    }
  }

  /**
   * Name of the icon folder.
   */
  @property({ type: String, attribute: 'folder-name' }) public folderName?: string;

  /**
   * Name of the icon (with .svg).
   */
  @property({ type: String, attribute: 'icon-name' }) public iconName?: string;

  /**
   * Width of the icon.
   * If not defined then width will be the new height.
   */
  @property({ type: String }) public width?: string;

  /**
   * Height of the icon.
   * If not defined then width will be the new height.
   */
  @property({ type: String }) public height?: string;

  /**
   * When icon rendered in img format then should use this format.
   */
  @property({ type: String }) public source?: string;

  protected render(): TemplateResult {
    return html`
      ${this.source ? this.renderImg() : this.renderIcon()}
    `;
  }

  private renderIcon(): TemplateResult {
    let style: string[] = [];

    if (this.width && !this.height) {
      style.push(`width:${this.width}px; height:${this.width}px;`);
    } else if (!this.width && this.height) {
      style.push(`width:${this.height}px; height:${this.height}px;`);
    } else if (this.width && this.height) {
      style.push(`width:${this.width}px; height:${this.height}px;`);
    }

    style = style.concat([
      `mask-image: url('${this.getUrl()}');`,
      `mask-repeat: no-repeat;`,
      `mask-size: contain;`,
      `mask-position: center center;`,
      `-webkit-mask-image: url('${this.getUrl()}');`,
      `-webkit-mask-repeat: no-repeat;`,
      `-webkit-mask-size: contain;`,
      `-webkit-mask-position: center center;`,
      `background: var(--icon-color);`,
      `transition: var(--transitions)`
    ]);

    return html`
      <div class="icon" style="${style.join(' ')}"></div>
    `;
  }

  protected renderImg(): TemplateResult {
    const style: string[] = [];

    if (this.width && !this.height) {
      style.push(`width:${this.width}px; height:${this.width}px;`);
    } else if (!this.width && this.height) {
      style.push(`width:${this.height}px; height:${this.height}px;`);
    } else if (this.width && this.height) {
      style.push(`width:${this.width}px; height:${this.height}px;`);
    }

    return html`
      <img class="icon" style="${style.join(' ')}" src="${this.getUrl()}" />
    `;
  }

  private getUrl(): string {
    if (!this.folderName) {
      throw Error('Folder name not found in the store.');
    }

    if (iconStore.size === 0) {
      throw Error('No folder in the store.');
    } else if (!iconStore.has(this.folderName)) {
      throw Error('Folder name not found in the store.');
    }

    return `${
      !this.source
        ? `${iconStore.get(this.folderName)}/${this.iconName}`
        : `${iconStore.get(this.folderName)}/${this.source}`
    }`;
  }
}

customElements.define(JupiterIconElement.tag, JupiterIconElement);
