import { UI_BaseComponent } from './UI_BaseComponent.js';

export class UI_TextBox extends UI_BaseComponent {
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
    textColor = "#fff",
    backgroundColor = "transparent",
    fontFamily = "sans-serif",
    fontSize = 20,
    width,
    height,
    className = "",
    parent = document.body
  }) {
    const el = document.createElement('div');
    el.textContent = text;
    el.style.width = width + 'px';
    el.style.height = height + 'px';
    el.style.background = backgroundColor;
    el.style.color = textColor;
    el.style.fontFamily = fontFamily;
    el.style.fontSize = typeof fontSize === 'number' ? fontSize + 'px' : fontSize;
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.borderRadius = '8px';
    el.style.boxSizing = 'border-box';
    super({ el, className, parent });
    this.el = el;
  }

  setText(text) {
    this.el.textContent = text;
  }
}