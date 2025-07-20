import { UI_BaseComponent } from './UI_BaseComponent.js';

/**
 * 子要素を自由な位置・サイズで配置できるUIコンテナ
 * （絶対座標でadd時に指定、後から移動・サイズ変更も可能）
 */
export class UI_FreeContainer extends UI_BaseComponent {
  /**
   * @param {Object} options
   * @param {number} options.x - 配置X座標
   * @param {number} options.y - 配置Y座標
   * @param {number} options.width - コンテナの幅
   * @param {number} options.height - コンテナの高さ
   * @param {string} [options.backgroundColor]
   * @param {string} [options.className]
   * @param {HTMLElement} [options.parent]
   */
  constructor({
    x,
    y,
    width,
    height,
    backgroundColor = '',
    className = '',
    parent = document.body
  }) {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.width = width + 'px';
    el.style.height = height + 'px';
    el.style.overflow = 'hidden';
    el.style.boxSizing = 'border-box';
    if (backgroundColor) el.style.background = backgroundColor;
    super({ el, className, parent });
    this.el = el;

    this.children = [];
    this.backgroundColor = backgroundColor;
  }

  /**
   * @param {UI_BaseComponent} child
   * @param {number} x - 子要素の左上X座標（コンテナ基準）
   * @param {number} y - 子要素の左上Y座標（コンテナ基準）
   * @param {number} [width] - 子要素の幅（省略時はchild.elの既存値）
   * @param {number} [height] - 子要素の高さ（省略時はchild.elの既存値）
   */
  add(child, x, y, width, height) {
    child.el.style.position = 'absolute';
    child.el.style.left = x + 'px';
    child.el.style.top = y + 'px';
    if (width !== undefined) child.el.style.width = width + 'px';
    if (height !== undefined) child.el.style.height = height + 'px';
    this.children.push(child);
    this.el.appendChild(child.el);
  }

  /**
   * 子要素の位置・サイズを変更
   * @param {UI_BaseComponent} child
   * @param {number} x
   * @param {number} y
   * @param {number} [width]
   * @param {number} [height]
   */
  setChildRect(child, x, y, width, height) {
    child.el.style.left = x + 'px';
    child.el.style.top = y + 'px';
    if (width !== undefined) child.el.style.width = width + 'px';
    if (height !== undefined) child.el.style.height = height + 'px';
  }

  remove(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      if (child.el.parentNode === this.el) {
        this.el.removeChild(child.el);
      }
    }
  }

  clear() {
    this.children.forEach(child => {
      if (child.el.parentNode === this.el) {
        this.el.removeChild(child.el);
      }
    });
    this.children = [];
  }

  setBackgroundColor(color) {
    this.backgroundColor = color;
    this.el.style.background = color;
  }

  setRect(x, y, width, height) {
    this.el.style.left = x + 'px';
    this.el.style.top = y + 'px';
    this.el.style.width = width + 'px';
    this.el.style.height = height + 'px';
  }
}