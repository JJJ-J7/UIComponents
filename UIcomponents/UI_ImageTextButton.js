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
    scale = 1,
    enabled = true,
    onClick,
    className = '',
    parent = document.body,
    imagePosition = 'left',
    gap = 8,
    position,
    left,
    top,
    right,
    bottom,
    zIndex,
    center = true
  } = {}) {
    const el = document.createElement('button');
    el.type = 'button';
    // width/height未指定時は画像の実サイズを取得し、scaleを適用
    // サイズ計算用関数
    const updateButtonSize = () => {
      // 画像とテキスト両方の幅・高さを考慮
      const imgRect = this.img ? this.img.getBoundingClientRect() : { width: 0, height: 0 };
      const spanRect = this.span ? this.span.getBoundingClientRect() : { width: 0, height: 0 };
      let totalWidth = 0, totalHeight = 0;
      if (imagePosition === 'top' || imagePosition === 'bottom') {
        totalWidth = Math.max(imgRect.width, spanRect.width);
        totalHeight = imgRect.height + gap + spanRect.height;
      } else {
        totalWidth = imgRect.width + gap + spanRect.width;
        totalHeight = Math.max(imgRect.height, spanRect.height);
      }
      if (width !== undefined) totalWidth = width;
      if (height !== undefined) totalHeight = height;
      el.style.width = totalWidth * scale + 'px';
      el.style.height = totalHeight * scale + 'px';
      // center==trueなら中心位置を維持
      if (center && (el.style.position === 'absolute' || el.style.position === 'fixed')) {
        el.style.left = '50%';
        el.style.top = '50%';
        el.style.transform = 'translate(-50%, -50%)';
      }
    };

    // 画像とテキストのDOM生成後にサイズ計算
    setTimeout(updateButtonSize, 0);
    el.style.border = 'none';
    el.style.borderRadius = '8px';
    el.style.cursor = 'pointer';
    el.style.transition = 'filter 0.2s, opacity 0.2s, transform 0.08s';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.padding = '0';
    el.style.userSelect = 'none';
    el.style.webkitUserSelect = 'none';
    el.style.touchAction = 'manipulation';
    el.style.outline = 'none';
    el.style.webkitTapHighlightColor = 'transparent';

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
    // 画像ロード後にも再計算
    this.img.onload = updateButtonSize;

    // イベント
    if (onClick) {
      el.addEventListener('click', (e) => {
        if (this.enabled) onClick(e);
      });
    }

    // 押下時のアニメーション
    const baseTransform = this.center ? 'translate(-50%, -50%)' : '';    
    el.addEventListener('mousedown', () => {
      if (this.enabled) el.style.transform = `${baseTransform} scale(1.08)`;
    });
    el.addEventListener('touchstart', () => {
      if (this.enabled) el.style.transform = `${baseTransform} scale(1.08)`;
    });
    el.addEventListener('mouseup', () => {
      el.style.transform = `${baseTransform} scale(1)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = `${baseTransform} scale(1)`;
    });
    el.addEventListener('touchend', () => {
      el.style.transform = `${baseTransform} scale(1)`;
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
    // テキスト変更後にサイズ再計算
    setTimeout(() => {
      // center==trueなら中心維持のためleft/top/transformも再設定
      if (this.center && (this.el.style.position === 'absolute' || this.el.style.position === 'fixed')) {
        this.el.style.left = '50%';
        this.el.style.top = '50%';
        this.el.style.transform = 'translate(-50%, -50%)';
      }
      // サイズ再計算
      const imgRect = this.img.getBoundingClientRect();
      const spanRect = this.span.getBoundingClientRect();
      let totalWidth = 0, totalHeight = 0;
      if (this.el.style.flexDirection === 'column') {
        totalWidth = Math.max(imgRect.width, spanRect.width);
        totalHeight = imgRect.height + gap + spanRect.height;
      } else {
        totalWidth = imgRect.width + gap + spanRect.width;
        totalHeight = Math.max(imgRect.height, spanRect.height);
      }
      this.el.style.width = totalWidth + 'px';
      this.el.style.height = totalHeight + 'px';
    }, 0);
  }
}