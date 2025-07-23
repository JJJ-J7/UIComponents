import { UI_BaseComponent } from './UI_BaseComponent.js';
import { UI_ThemeColors } from './UI_ThemeColors.js';

export class UI_TxtBox extends UI_BaseComponent {
  /**
   * @param {Object} options
   * @param {string} options.text - 表示するテキスト
   * @param {string} [options.textColor="#fff"]
   * @param {string} [options.backgroundColor="transparent"]
   * @param {string} [options.fontFamily="sans-serif"]
   * @param {string|number} [options.fontSize=20]
   * @param {number} options.width
   * @param {number} options.height
   * @param {string} [options.className]
   * @param {HTMLElement} [options.parent]
   */
  constructor({
    text,
    textColor = UI_ThemeColors.txtDark,
    backgroundColor = UI_ThemeColors.txtBgLight,
    fontFamily = "sans-serif",
    fontSize = 20,
    width,
    height,
    className = "",
    parent = document.body,
    position,
    left,
    top,
    right,
    bottom,
    zIndex,
    center = true
  } = {}) {
    const el = document.createElement('div');
    el.textContent = text;
    // width/height未指定時はテキストサイズ＋マージンで自動設定
    if (width !== undefined && height !== undefined) {
      el.style.width = width + 'px';
      el.style.height = height + 'px';
    } else {
      el.style.width = 'auto';
      el.style.height = 'auto';
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        const marginH = 16, marginV = 8;
        el.style.width = (rect.width + marginH * 2) + 'px';
        el.style.height = (rect.height + marginV * 2) + 'px';
        el.style.padding = marginV + 'px ' + marginH + 'px';
      }, 0);
    }
    el.style.background = backgroundColor;
    el.style.color = textColor;
    el.style.fontFamily = fontFamily;
    el.style.fontSize = typeof fontSize === 'number' ? fontSize + 'px' : fontSize;
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.borderRadius = '8px';
    el.style.boxSizing = 'border-box';
    super({ el, className, parent, position, left, top, right, bottom, zIndex, backgroundColor, center });
    this.el = el;
  }

  setText(text) {
    this.el.textContent = text;
    // サイズ再計算（auto→width/height固定値に戻す）
    this.el.style.width = '';
    this.el.style.height = '';
    // レイアウト確定後のサイズ取得
    const rect = this.el.getBoundingClientRect();
    if (rect.width && rect.height) {
      this.el.style.width = rect.width + 'px';
      this.el.style.height = rect.height + 'px';
    }
    // center==trueなら中心維持
    if (this.center && (this.left || this.top)) {
      if (typeof this.left === 'number' && typeof rect.width === 'number') {
        this.el.style.left = (this.left + rect.width/2) + 'px';
      }
      if (typeof this.top === 'number' && typeof rect.height === 'number') {
        this.el.style.top = (this.top + rect.height/2) + 'px';
      }
    }
  }
}