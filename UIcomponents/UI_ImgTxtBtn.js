import { UI_BaseComponent } from './UI_BaseComponent.js';
import { UI_ThemeColors } from './UI_ThemeColors.js';

/**
 * 画像＋テキストボタンUI
 */
export class UI_ImgTxtBtn extends UI_BaseComponent {
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
    textColor = UI_ThemeColors.txtLight,
    backgroundColor = UI_ThemeColors.btnActive,
    fontFamily = 'sans-serif',
    fontSize = 20,
    width,
    height,
    scale = 1,
    enabled = true,
    onClick,
    scene = null,
    gotoScene = null,
    gotoSceneArgs = {},
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
    // サイズ計算用関数（内容＋paddingを考慮）
    const updateButtonSize = () => {
      const imgRect = this.img ? this.img.getBoundingClientRect() : { width: 0, height: 0 };
      const spanRect = this.span ? this.span.getBoundingClientRect() : { width: 0, height: 0 };
      let contentWidth = 0, contentHeight = 0;
      if (imagePosition === 'top' || imagePosition === 'bottom') {
        contentWidth = Math.max(imgRect.width, spanRect.width);
        contentHeight = imgRect.height + gap + spanRect.height;
      } else {
        contentWidth = imgRect.width + gap + spanRect.width;
        contentHeight = Math.max(imgRect.height, spanRect.height);
      }
      // padding値（左1em, 右3em, 上下0.5em）
      const fontSizePx = (typeof fontSize === 'number' ? fontSize : (typeof fontSize === 'string' && fontSize.endsWith('px') ? parseInt(fontSize) : 16));
      const paddingLeft = 1 * fontSizePx;
      const paddingRight = 3 * fontSizePx;
      const paddingV = 0.5 * fontSizePx;
      // 指定があれば優先
      let totalWidth = contentWidth + paddingLeft + paddingRight;
      let totalHeight = contentHeight + 2 * paddingV;
      if (width !== undefined) totalWidth = width;
      if (height !== undefined) totalHeight = height;
      el.style.width = totalWidth * scale + 'px';
      el.style.height = totalHeight * scale + 'px';
      el.style.padding = paddingV + 'px ' + paddingRight + 'px ' + paddingV + 'px ' + paddingLeft + 'px';
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
    el.style.background = backgroundColor;

    super({ el, className, parent, position, left, top, right, bottom, zIndex, backgroundColor, center });

    this.enabled = enabled;
    this._gotoSceneArgs = gotoSceneArgs || {};

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

    // paddingはupdateButtonSizeで一括設定するため、ここではspanのマージンのみ調整
    if (imagePosition === 'left' || !imagePosition) {
      this.span.style.marginRight = '0';
      this.span.style.marginLeft = '0';
    } else if (imagePosition === 'right') {
      this.span.style.marginLeft = gap + 'px';
      this.span.style.marginRight = '0';
    } else {
      this.span.style.marginRight = '0';
      this.span.style.marginLeft = '0';
    }

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
    // onClickまたはgotoScene指定時のイベント
    if (gotoScene && scene) {
      el.addEventListener('click', (e) => {
        if (!this.enabled) return;
        if (onClick) onClick(e);
        // from: scene.key もデフォルトで付与
        const args = Object.assign({ from: scene.key }, this._gotoSceneArgs);
        scene.scene.start(gotoScene, args);
      });
    } else if (onClick) {
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

  /**
   * ジャンプ先シーンに渡す引数を変更する
   * @param {Object} args
   */
  setGotoSceneArgs(args) {
    this._gotoSceneArgs = args || {};
  }
}