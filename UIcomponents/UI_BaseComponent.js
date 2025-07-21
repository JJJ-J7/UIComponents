export class UI_BaseComponent {
  /**
   * @param {Object} options
   * @param {HTMLElement} [options.el] - サブクラスで生成した要素
   * @param {string} [options.className]
   * @param {HTMLElement} [options.parent]
   * @param {string} [options.position] - CSS position値（例: 'absolute', 'fixed', 'relative' など）
   * @param {number|string} [options.left] - 親基準の左位置（例: 100, '50%' など）
   * @param {number|string} [options.top] - 親基準の上位置
   * @param {number|string} [options.right] - 親基準の右位置
   * @param {number|string} [options.bottom] - 親基準の下位置
   * @param {number} [options.zIndex] - z-index値
   * @param {string} [options.backgroundColor] - 背景色
   * @param {boolean} [options.center=true] - 要素を中心に配置するか
   */
  constructor({
    el = null,
    className = '',
    parent = document.body,
    position,
    left,
    top,
    right,
    bottom,
    zIndex,
    backgroundColor,
    center = true
  } = {}) {
    console.log('UI_BaseComponent:');
    this.el = el;
    if (!this.el) {
      this.el = document.createElement('div');
    }
    // UIコンポーネント識別用属性とインスタンス参照
    this.el.setAttribute('data-ui-component', '');
    this.el.__uiInstance = this;
    this.className = className;
    if (className) this.el.className = className;
    this.position = position;
    if (position) this.el.style.position = position;
    this.left = left;
    if (left !== undefined) this.el.style.left = typeof left === 'number' ? left + 'px' : left;
    this.top = top;
    if (top !== undefined) this.el.style.top = typeof top === 'number' ? top + 'px' : top;
    this.right = right;
    if (right !== undefined) this.el.style.right = typeof right === 'number' ? right + 'px' : right;
    this.bottom = bottom;
    if (bottom !== undefined) this.el.style.bottom = typeof bottom === 'number' ? bottom + 'px' : bottom;
    this.zIndex = zIndex;
    if (zIndex !== undefined) this.el.style.zIndex = zIndex;
    this.backgroundColor = backgroundColor;
    if (backgroundColor !== undefined) this.el.style.background = backgroundColor;
    this.center = center;
    if (center) {
      this.el.style.transform = 'translate(-50%, -50%)';
    }
    this.parent = parent;
    if (parent && this.el) parent.appendChild(this.el);
    this._destroyTimer = null;
    console.log(`[${new Date().toISOString()}] BaseComponent outerHTML:`, this.el.outerHTML);
  }

  show() {
    if (this.el) this.el.style.display = '';
  }

  hide() {
    if (this.el) this.el.style.display = 'none';
  }

  destroy() {
    if (this._destroyTimer) {
      clearTimeout(this._destroyTimer);
      this._destroyTimer = null;
    }
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
  }

  /**
   * 指定秒数後に自動でdestroyされる
   * @param {number} seconds
   */
  destroyAfter(seconds) {
    if (this._destroyTimer) clearTimeout(this._destroyTimer);
    this._destroyTimer = setTimeout(() => {
      this.destroy();
    }, seconds * 1000);
  }

  /**
   * transformのtranslateなど他の値を維持したまま、scaleだけを変更する
   * @param {number} scale
   */
  setScaleOnly(scale = 1) {
    const style = window.getComputedStyle(this.el);
    let t = style.transform;
    if (!t || t === 'none') {
      this.el.style.transform = `scale(${scale})`;
      return;
    }
    // scale()が含まれていれば置換、なければ末尾に追加
    if (/scale\([^)]*\)/.test(t)) {
      this.el.style.transform = t.replace(/scale\([^)]*\)/, `scale(${scale})`);
    } else {
      this.el.style.transform = t + ` scale(${scale})`;
    }
  }
}