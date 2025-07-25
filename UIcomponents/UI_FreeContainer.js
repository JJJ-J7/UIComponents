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
   * @param {string} [options.position='absolute'] - CSS position
   * @param {number} [options.left] - left座標（x優先）
   * @param {number} [options.top] - top座標（y優先）
   * @param {number} [options.right] - right座標
   * @param {number} [options.bottom] - bottom座標
   * @param {number} [options.zIndex]
   * @param {boolean} [options.center] - 親の中央に配置するか
   */
  constructor({
    x,
    y,
    width,
    height,
    backgroundColor = '',
    className = '',
    parent = document.body,
    position = 'absolute',
    left,
    top,
    right,
    bottom,
    zIndex,
    center,
    borderRadius,
    onClick,
    pointerEvents,
    sceneKey = null,
  }) {
    const el = document.createElement('div');
    el.style.position = position;
    // x/y優先、なければleft/top/right/bottom
    if (x !== undefined) el.style.left = x + 'px';
    else if (left !== undefined) el.style.left = typeof left === 'number' ? left + 'px' : left;
    if (y !== undefined) el.style.top = y + 'px';
    else if (top !== undefined) el.style.top = typeof top === 'number' ? top + 'px' : top;
    if (right !== undefined) el.style.right = typeof right === 'number' ? right + 'px' : right;
    if (bottom !== undefined) el.style.bottom = typeof bottom === 'number' ? bottom + 'px' : bottom;
    if (width !== undefined) el.style.width = width + 'px';
    if (height !== undefined) el.style.height = height + 'px';
    el.style.overflow = 'hidden';
    el.style.boxSizing = 'border-box';
    if (zIndex !== undefined) el.style.zIndex = zIndex;
    if (backgroundColor) el.style.background = backgroundColor;
    if (borderRadius !== undefined) el.style.borderRadius = typeof borderRadius === 'number' ? borderRadius + 'px' : borderRadius;
    if (pointerEvents) el.style.pointerEvents = pointerEvents;
    if (typeof onClick === 'function') {
      el.addEventListener('click', onClick);
      // pointerEventsが未指定ならautoに
      if (!pointerEvents) el.style.pointerEvents = 'auto';
    }
    super({ el, className, parent, position, left, top, right, bottom, zIndex, backgroundColor, center, sceneKey });
    this.el = el;

    this.children = [];
    this.backgroundColor = backgroundColor;
    this.borderRadius = borderRadius;
  }

  /**
   * 子要素を追加する。位置・サイズ・スタイルはoptionsで指定。
   * @param {UI_BaseComponent} child
   * @param {Object} [options] - left, top, right, bottom, width, height, zIndex, center など
   */
  add(child, options = {}) {
    child.el.style.position = 'absolute'; // 子要素は相対位置
    if (options.left !== undefined) child.el.style.left = typeof options.left === 'number' ? options.left + 'px' : options.left;
    if (options.top !== undefined) child.el.style.top = typeof options.top === 'number' ? options.top + 'px' : options.top;
    if (options.right !== undefined) child.el.style.right = typeof options.right === 'number' ? options.right + 'px' : options.right;
    if (options.bottom !== undefined) child.el.style.bottom = typeof options.bottom === 'number' ? options.bottom + 'px' : options.bottom;
    if (options.width !== undefined) child.el.style.width = options.width + 'px';
    if (options.height !== undefined) child.el.style.height = options.height + 'px';
    if (options.zIndex !== undefined) child.el.style.zIndex = options.zIndex;
    if (options.center && options.width !== undefined && options.height !== undefined) {
      child.el.style.left = `calc(50% - ${options.width/2}px)`;
      child.el.style.top = `calc(50% - ${options.height/2}px)`;
    }
    this.children.push(child);
    this.el.appendChild(child.el);
  }

  /**
   * 子要素の位置・サイズ・スタイルを変更する。全てoptionsで指定。
   * @param {UI_BaseComponent} child
   * @param {Object} [options] - left, top, right, bottom, width, height, zIndex, center など
   */
  setChildRect(child, options = {}) {
    if (options.left !== undefined) child.el.style.left = typeof options.left === 'number' ? options.left + 'px' : options.left;
    if (options.top !== undefined) child.el.style.top = typeof options.top === 'number' ? options.top + 'px' : options.top;
    if (options.right !== undefined) child.el.style.right = typeof options.right === 'number' ? options.right + 'px' : options.right;
    if (options.bottom !== undefined) child.el.style.bottom = typeof options.bottom === 'number' ? options.bottom + 'px' : options.bottom;
    if (options.width !== undefined) child.el.style.width = options.width + 'px';
    if (options.height !== undefined) child.el.style.height = options.height + 'px';
    if (options.zIndex !== undefined) child.el.style.zIndex = options.zIndex;
    if (options.center && options.width !== undefined && options.height !== undefined) {
      child.el.style.left = `calc(50% - ${options.width/2}px)`;
      child.el.style.top = `calc(50% - ${options.height/2}px)`;
    }
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
    if (this.borderRadius !== undefined) {
      this.el.style.borderRadius = typeof this.borderRadius === 'number' ? this.borderRadius + 'px' : this.borderRadius;
    }
  }

  setRect(x, y, width, height) {
    this.el.style.left = x + 'px';
    this.el.style.top = y + 'px';
    this.el.style.width = width + 'px';
    this.el.style.height = height + 'px';
    if (this.borderRadius !== undefined) {
      this.el.style.borderRadius = typeof this.borderRadius === 'number' ? this.borderRadius + 'px' : this.borderRadius;
    }
  }
}