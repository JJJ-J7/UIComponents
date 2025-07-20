import { UI_BaseComponent } from './UI_BaseComponent.js';

/**
 * テキストボタンUI
 */
export class UI_TextButton extends UI_BaseComponent {
  /**
   * @param {Object} options
   * @param {string} options.text
   * @param {string} options.backgroundColor
   * @param {string} options.textColor
   * @param {string} options.fontFamily
   * @param {string|number} options.fontSize
   * @param {number} options.width
   * @param {number} options.height
   * @param {boolean} [options.enabled=true]
   * @param {function} [options.onClick]
   * @param {string} [options.className]
   * @param {HTMLElement} [options.parent]
   * @param {string} [options.position]
   * @param {number|string} [options.left]
   * @param {number|string} [options.top]
   * @param {number|string} [options.right]
   * @param {number|string} [options.bottom]
   * @param {number} [options.zIndex]
   */
  constructor({
    text,
    backgroundColor,
    textColor,
    fontFamily,
    fontSize,
    width,
    height,
    enabled = true,
    onClick,
    className = '',
    parent,
    position,
    left,
    top,
    right,
    bottom,
    zIndex
  }) {
    const el = document.createElement('button');
    el.type = 'button';
    el.style.width = width + 'px';
    el.style.height = height + 'px';
    el.style.border = 'none';
    el.style.borderRadius = '8px';
    el.style.cursor = 'pointer';
    el.style.transition = 'filter 0.2s, opacity 0.2s, transform 0.08s';
    el.textContent = text;
    el.style.background = backgroundColor;
    el.style.color = textColor;
    el.style.fontFamily = fontFamily;
    el.style.fontSize = typeof fontSize === 'number' ? fontSize + 'px' : fontSize;

    super({ el, className, parent, position, left, top, right, bottom, zIndex, backgroundColor});

    this._backgroundColor = backgroundColor;
    this._textColor = textColor;
    this.enabled = enabled;

    // イベント
    if (onClick) {
      el.addEventListener('click', (e) => {
        if (this.enabled) onClick(e);
      });
    }

    // 押下時のアニメーション
    el.addEventListener('mousedown', () => {
      if (this.enabled) this.setScaleOnly(1.08);
    });
    el.addEventListener('touchstart', () => {
      if (this.enabled) this.setScaleOnly(1.08);
    });
    el.addEventListener('mouseup', () => {
      this.setScaleOnly(1.0/1.08);
    });
    el.addEventListener('mouseleave', () => {
      this.setScaleOnly(1.0/1.08);
    });
    el.addEventListener('touchend', () => {
      this.setScaleOnly(1.0/1.08);
    });

    this.setEnabled(this.enabled);
  }

  setEnabled(flag) {
    this.enabled = !!flag;
    this.el.disabled = !this.enabled;
    if (this.enabled) {
      this.el.style.filter = '';
      this.el.style.opacity = '1.0';
      this.el.style.cursor = 'pointer';
      this.el.style.background = this._backgroundColor;
      this.el.style.color = this._textColor;
    } else {
      this.el.style.filter = 'grayscale(60%)';
      this.el.style.opacity = '0.5';
      this.el.style.cursor = 'not-allowed';
      this.el.style.background = '#aaa';
      this.el.style.color = '#eee';
    }
  }

  setText(text) {
    this.el.textContent = text;
  }
}