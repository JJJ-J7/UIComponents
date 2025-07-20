import { UI_BaseComponent } from './UI_BaseComponent.js';

export class UI_Image extends UI_BaseComponent {
  /**
   * @param {Object} options
   * @param {string} options.src - 画像URL
   * @param {string} [options.alt]
   * @param {number} options.width
   * @param {number} options.height
   * @param {string} [options.className]
   * @param {HTMLElement} [options.parent]
   * @param {string} [options.backgroundColor="transparent"]
   * @param {string} [options.borderRadius="8px"]
   */
  constructor({
    src,
    alt = "",
    width,
    height,
    className = "",
    parent = document.body,
    backgroundColor = "transparent",
    borderRadius = "8px"
  }) {
    const el = document.createElement('img');
    el.src = src;
    el.alt = alt;
    el.style.width = width + 'px';
    el.style.height = height + 'px';
    el.style.background = backgroundColor;
    el.style.borderRadius = borderRadius;
    el.style.display = 'block';
    el.style.objectFit = 'contain';
    super({ el, className, parent });
    this.el = el;
  }
}