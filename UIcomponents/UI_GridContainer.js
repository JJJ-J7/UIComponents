import { UI_BaseComponent } from './UI_BaseComponent.js';

export class UI_GridContainer extends UI_BaseComponent {
  /**
   * @param {Object} options
   * @param {number} options.rows - 行数
   * @param {number} options.cols - 列数
   * @param {number} options.x - 配置X座標
   * @param {number} options.y - 配置Y座標
   * @param {number} options.width - グリッド全体の幅
   * @param {number} options.height - グリッド全体の高さ
   * @param {number} [options.marginX=8] - 要素間Xマージン
   * @param {number} [options.marginY=8] - 要素間Yマージン
   * @param {number} [options.outerMargin=8] - 外周マージン
   * @param {string} [options.backgroundColor] - グリッドの背景色
   * @param {string} [options.className]
   * @param {HTMLElement} [options.parent]
   */
  constructor({
    rows,
    cols,
    x,
    y,
    width,
    height,
    marginX = 8,
    marginY = 8,
    outerMargin = 8,
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
    el.style.overflow = 'auto';
    el.style.boxSizing = 'border-box';
    el.style.padding = outerMargin + 'px';
    el.style.display = 'grid';
    el.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    el.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    el.style.gap = `${marginY}px ${marginX}px`;
    if (backgroundColor) el.style.background = backgroundColor;
    super({ el, className, parent });
    this.el = el;

    this.rows = rows;
    this.cols = cols;
    this.marginX = marginX;
    this.marginY = marginY;
    this.outerMargin = outerMargin;
    this.children = [];
    this.backgroundColor = backgroundColor;
  }

  setBackgroundColor(color) {
    this.backgroundColor = color;
    this.el.style.background = color;
  }

  add(child) {
    this.children.push(child);
    this.el.appendChild(child.el);
    this._updateGrid();
  }

  remove(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      if (child.el.parentNode === this.el) {
        this.el.removeChild(child.el);
      }
      this._updateGrid();
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

  setGrid(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.el.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    this.el.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    this._updateGrid();
  }

  setMargin(marginX, marginY, outerMargin = this.outerMargin) {
    this.marginX = marginX;
    this.marginY = marginY;
    this.outerMargin = outerMargin;
    this.el.style.gap = `${marginY}px ${marginX}px`;
    this.el.style.padding = outerMargin + 'px';
  }

  setRect(x, y, width, height) {
    this.el.style.left = x + 'px';
    this.el.style.top = y + 'px';
    this.el.style.width = width + 'px';
    this.el.style.height = height + 'px';
  }

  _updateGrid() {
    // grid自体はCSSで自動配置されるので、特別な処理は不要
    // 必要ならここで子要素のサイズ調整なども可能
  }
}