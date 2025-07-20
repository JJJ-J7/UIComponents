import { UI_BaseComponent } from './UI_BaseComponent.js';

/**
 * 画像＋テキストボタンUI
 */
export class UI_ImageTextButton extends UI_BaseComponent {
  /**
   * @param {Object} options
   * @param {string} options.imageSrc
   * @param {string} [options.alt]
   * @param {string} options.text
   * @param {string} [options.textColor]
   * @param {string} [options.fontFamily]
   * @param {string|number} [options.fontSize]
   * @param {number} options.width
   * @param {number} options.height
   * @param {boolean} [options.enabled=true]
   * @param {function} [options.onClick]
   * @param {string} [options.className]
   * @param {HTMLElement} [options.parent]
   * @param {string} [options.imagePosition='left']
   * @param {number} [options.gap=8]
   * @param {string} [options.position]
   * @param {number|string} [options.left]
   * @param {number|string} [options.top]
   * @param {number|string} [options.right]
   * @param {number|string} [options.bottom]
   * @param {number} [options.zIndex]
   */
  constructor({
    imageSrc,
    alt = '',
    text,
    textColor = '#fff',
    fontFamily = 'sans-serif',
    fontSize = 20,
    width,
    height,
    enabled = true,
    onClick,
    className = '',
    parent,
    imagePosition = 'left',
    gap = 8,
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
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.padding = '0';

    super({ el, className, parent, position, left, top, right, bottom, zIndex });

    this.enabled = enabled;

    this.img = document.createElement('img');
    this.img.src = imageSrc;
    this.img.alt = alt;
    this.img.style.display = 'inline-block';
    this.img.style.verticalAlign = 'middle';
    this.img.style.pointerEvents = 'none';

    this.span = document.createElement('span');
    this.span.textContent = text;
    this.span.style.color = textColor;
    this.span.style.fontFamily = fontFamily;
    this.span.style.fontSize = typeof fontSize === 'number' ? fontSize + 'px' : fontSize;
    this.span.style.verticalAlign = 'middle';
    this.span.style.margin = '0';

    el.textContent = '';

    switch (imagePosition) {
      case 'right':
        this.span.style.marginRight = gap + 'px';
        el.appendChild(this.span);
        el.appendChild(this.img);
        break;
      case 'top':
        el.style.flexDirection = 'column';
        this.img.style.marginBottom = gap + 'px';
        el.appendChild(this.img);
        el.appendChild(this.span);
        break;
      case 'bottom':
        el.style.flexDirection = 'column';
        this.img.style.marginTop = gap + 'px';
        el.appendChild(this.span);
        el.appendChild(this.img);
        break;
      case 'left':
      default:
        this.img.style.marginRight = gap + 'px';
        el.appendChild(this.img);
        el.appendChild(this.span);
        break;
    }

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
    } else {
      this.el.style.filter = 'grayscale(60%)';
      this.el.style.opacity = '0.5';
      this.el.style.cursor = 'not-allowed';
    }
  }

  setText(text) {
    this.span.textContent = text;
  }
}