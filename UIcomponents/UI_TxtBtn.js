import { UI_BaseComponent } from './UI_BaseComponent.js';

/**
 * テキストボタンUI
 */
export class UI_TxtBtn extends UI_BaseComponent {
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
    scene = null,
    gotoScene = null,
    className = '',
    parent = document.body,
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
    // width/height未指定時はテキストサイズ＋マージンで自動設定
    if (width !== undefined && height !== undefined) {
      el.style.width = width + 'px';
      el.style.height = height + 'px';
    } else {
      // 仮サイズで描画し、レイアウト後に自動調整
      el.style.width = 'auto';
      el.style.height = 'auto';
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        // デフォルトマージン: 左右16px, 上下8px
        const marginH = 16, marginV = 8;
        el.style.width = (rect.width + marginH * 2) + 'px';
        el.style.height = (rect.height + marginV * 2) + 'px';
        el.style.padding = marginV + 'px ' + marginH + 'px';
      }, 0);
    }
    el.style.border = 'none';
    el.style.borderRadius = '8px';
    el.style.cursor = 'pointer';
    el.style.transition = 'filter 0.2s, opacity 0.2s, transform 0.08s';
    el.textContent = text;
    el.style.background = backgroundColor;
    el.style.color = textColor;
    el.style.fontFamily = fontFamily;
    el.style.fontSize = typeof fontSize === 'number' ? fontSize + 'px' : fontSize;
    el.style.userSelect = 'none';
    el.style.webkitUserSelect = 'none';
    el.style.touchAction = 'manipulation';

    super({ el, className, parent, position, left, top, right, bottom, zIndex, backgroundColor, center });

    this._backgroundColor = backgroundColor;
    this._textColor = textColor;
    this.enabled = enabled;

    // イベント
    // onClickまたはgotoScene指定時のイベント
    // 多重発火防止用フラグ
    this._jumping = false;
    if (gotoScene && scene) {
      el.addEventListener('click', (e) => {
        if (!this.enabled || this._jumping) return;
        this._jumping = true;
        if (onClick) onClick(e);
        // 押下アニメーションを再生（scale(1)に戻す）
        el.style.transform = `${this.center ? 'translate(-50%, -50%)' : ''} scale(1)`;
        // アニメーション時間(80ms)後にシーンジャンプ
        setTimeout(() => {
          scene.scene.start(gotoScene, { from: scene.key });
          this._jumping = false;
        }, 100);
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
      // left/topが50%等ならOK、px指定なら中心補正
      if (typeof this.left === 'number' && typeof rect.width === 'number') {
        this.el.style.left = (this.left + rect.width/2) + 'px';
      }
      if (typeof this.top === 'number' && typeof rect.height === 'number') {
        this.el.style.top = (this.top + rect.height/2) + 'px';
      }
    }
  }
}