import { UI_BaseComponent } from './UI_BaseComponent.js';

export class UI_Img extends UI_BaseComponent {
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
    scale = 1,
    className = "",
    parent = document.body,
    backgroundColor = "transparent",
    borderRadius = "8px",
    position,
    left,
    top,
    right,
    bottom,
    zIndex,
    center = true,
    scene = null,
    opacity = 1.0,
  } = {}) {
    const el = document.createElement('img');
    el.src = src;
    el.alt = alt;
    el.style.background = backgroundColor;
    el.style.borderRadius = borderRadius;
    el.style.display = 'block';
    el.style.objectFit = 'contain';

    // width/height未指定時は画像の実サイズを取得し、scaleを適用
    if (width !== undefined && height !== undefined) {
      el.style.width = (width * scale) + 'px';
      el.style.height = (height * scale) + 'px';
    } else {
      // 画像ロード前は非表示＋サイズ0
      el.style.opacity = '0';
      el.style.width = '0px';
      el.style.height = '0px';
      // 画像のロード後に実サイズ取得
      el.onload = () => {
        const w = el.naturalWidth;
        const h = el.naturalHeight;
        el.style.width = (w * scale) + 'px';
        el.style.height = (h * scale) + 'px';
        el.style.opacity = '1';
      };
    }

    super({ el, className, parent, position, left, top, right, bottom, zIndex, backgroundColor, center, scene, opacity });
    this.el = el;
  }
}