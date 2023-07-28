import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('file-viewer')
export class fileViewer extends LitElement {

    @property({type: Array, reflect: true, attribute: 'files'})
    files: string [] = []

    @property({type: Number, reflect: true, attribute: 'index'})
    index: number = 0

    // 定义旋转角度
    @property({type: Number, reflect: true, attribute: 'rotate'})
    rotate = 0


    private pre(): void {
        if (this.index === 0) {
            this.index = this.files.length - 1
        } else {
            this.index--
        }
        this.rotate = 0
    }

    private next() {
        if (this.index === this.files.length - 1) {
            this.index = 0
        } else {
            this.index++
        }

        this.rotate = 0
    }

    // 顺时针旋转
    private rotateRight() {
        this.rotate += 90
    }

    // 逆时针旋转
    private rotateLeft() {
        this.rotate -= 90
    }

    getFileStyle () {
        return `transform: rotate(${this.rotate}deg)`
    }

    render() {
        console.log(this.getFileStyle())
        console.log(this.files)

        return html`
            <div class="file-viewer-box-wrap">
                <div class="file" style="${this.getFileStyle()}">
                    ${this.files.map((file, index) => {
                        return index === this.index ? html`<img class="file-image" height="auto" width="auto"
                                                                src=${file}/>` : ''
                    })}
                </div>
                <div class="file-tool">
                    <button class="file-tool-btn" @click="${this.pre}">上一张</button>

                    <button class="file-tool-btn" @click="${this.rotateLeft}">左旋转</button>

                    <button class="file-tool-btn" @click="${this.rotateRight}">右旋转</button>

                    <button class="file-tool-btn" @click="${this.next}">下一张</button>
                </div>
            </div>
        `
    }


    static styles = css`

      :host * {
        box-sizing: border-box;
      }
      
      :host, .file-viewer-box-wrap {
        padding: 0;
        margin: 0;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .file {
        padding: 24px;
        transition: transform 0.3s ease 0s;
      }
      
      .file-image {
        max-width: 100%;
        margin: 24px;
      }

      .file-tool {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 0 20px;
        box-sizing: border-box;
        height: 50px;
        background: #fff;

      }

      .card {
        padding: 2em;
      }

      .read-the-docs {
        color: #888;
      }

      h1 {
        font-size: 3.2em;
        line-height: 1.1;
      }

      a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
      }

      a:hover {
        color: #535bf2;
      }

      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
      }

      button:hover {
        border-color: #646cff;
      }

      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }

      @media (prefers-color-scheme: light) {
        a:hover {
          color: #747bff;
        }

        button {
          background-color: #f9f9f9;
        }
      }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'file-viewer': fileViewer
    }
}
