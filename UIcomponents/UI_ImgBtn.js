import { UI_BaseComponent } from './UI_BaseComponent.js';
import * as UI from './UI_Settings.js';

/**
 * 画像ボタンUI
 */
export class UI_ImgBtn extends UI_BaseComponent {
  /**
   * @param {Object} options
   * @param {string} options.imageSrc
   * @param {string} [options.alt]
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
    imageSrc,
    alt = '',
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
    backgroundColor = '',
    position,
    left,
    top,
    right,
    bottom,
    zIndex,
    center = true,
    opacity = 1.0,
  } = {}) {
    const el = document.createElement('button');
    el.type = 'button';
    // width/height未指定時は画像の実サイズを取得し、scaleを適用
    if (width !== undefined && height !== undefined) {
      el.style.width = (width * scale) + 'px';
      el.style.height = (height * scale) + 'px';
    } else {
      // 画像のロード後に実サイズ取得
      const tempImg = document.createElement('img');
      tempImg.src = imageSrc;
      tempImg.onload = () => {
        const w = tempImg.naturalWidth;
        const h = tempImg.naturalHeight;
        el.style.width = (w * scale) + 'px';
        el.style.height = (h * scale) + 'px';
      };
    }
    el.style.border = 'none';
    el.style.borderRadius = '8px';
    el.style.cursor = 'pointer';
    el.style.transition = `filter 0.2s, opacity 0.2s, transform ${UI.UI_Settings.BtnScaleDuration/1000}s`;
    el.style.padding = '0';
    el.style.background = backgroundColor; 
    el.style.userSelect = 'none';
    el.style.webkitUserSelect = 'none';
    el.style.touchAction = 'manipulation';
    el.style.outline = 'none';
    el.style.webkitTapHighlightColor = 'transparent';

    super({ el, className, parent, position, left, top, right, bottom, zIndex, center, backgroundColor, scene, opacity });

    this.enabled = enabled;
    this._gotoSceneArgs = gotoSceneArgs || {};

    this.img = document.createElement('img');
    this.img.src = imageSrc;
    this.img.alt = alt;
    this.img.style.width = '100%';
    this.img.style.height = '100%';
    this.img.style.pointerEvents = 'none';
    this.img.style.display = 'block';

    el.textContent = '';
    el.appendChild(this.img);

    // イベント
    // onClickまたはgotoScene指定時のイベント
    // 多重発火防止用フラグ
    this._jumping = false;
    if (gotoScene && scene) {
      el.addEventListener('click', (e) => {
        if (!this.enabled || this._jumping) return;
        // ボタンのアニメーションを原型に固定
        el.style.transform = `${this.center ? 'translate(-50%, -50%)' : ''} scale(1)`;
        this._jumping = true;
        if (onClick) onClick();
        this.jumpToScene({
          scene,
          gotoScene,
          gotoSceneArgs: this._gotoSceneArgs,
          el,
          onClick: onClick ? (ev) => onClick(ev) : undefined
        });
        this._jumping = false;
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

  /**
   * ジャンプ先シーンに渡す引数を変更する
   * @param {Object} args
   */
  setGotoSceneArgs(args) {
    this._gotoSceneArgs = args || {};
  }
}