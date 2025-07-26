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
    parent = document.body,
    position = 'fixed',
    left,
    top,
    right,
    bottom,
    zIndex,
    center = true,
    borderRadius,
    scene = null, 
    opacity = 1.0,
  }) {
    const el = document.createElement('div');
    el.style.overflow = 'auto';
    el.style.boxSizing = 'border-box';
    el.style.padding = outerMargin + 'px';
    el.style.display = 'grid';
    el.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    el.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    el.style.gap = `${marginY}px ${marginX}px`;
    if (backgroundColor) el.style.background = backgroundColor;
    if (borderRadius !== undefined) el.style.borderRadius = typeof borderRadius === 'number' ? borderRadius + 'px' : borderRadius;
    super({ el, className, parent, position, left, top, right, bottom, zIndex, backgroundColor, center, scene, opacity });
    this.el = el;

    this.rows = rows;
    this.cols = cols;
    this.marginX = marginX;
    this.marginY = marginY;
    this.outerMargin = outerMargin;
    this.children = [];
    this.backgroundColor = backgroundColor;
    this.borderRadius = borderRadius;
    // サイズ指定があれば反映
    if (width !== undefined) el.style.width = width + 'px';
    if (height !== undefined) el.style.height = height + 'px';
    // 位置指定があれば反映
    if (x !== undefined) el.style.left = x + 'px';
    if (y !== undefined) el.style.top = y + 'px';
  }

  setBackgroundColor(color) {
    this.backgroundColor = color;
    this.el.style.background = color;
  }


  /**
   * 指定セルに子要素を追加
   * @param {UI_BaseComponent} child
   * @param {number} row 0-based
   * @param {number} col 0-based
   */
  addChild(child, row, col) {
    child.el.style.gridRow = (row + 1) + ' / span 1';
    child.el.style.gridColumn = (col + 1) + ' / span 1';
    // グリッド内の子要素は100%サイズ＆相対配置＆左上揃え
    child.el.style.position = 'relative';
    //child.el.style.transform = '';
    //if (child.center !== undefined) child.center = false;
    this.children.push(child);
    this.el.appendChild(child.el);
    this._updateGrid();
  }

  // 既存のaddは従来通り
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