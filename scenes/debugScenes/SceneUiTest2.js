import * as UI from '../../UIcomponents/index.js';

// サンプルダイアログクラス
// 先頭に書くのはclass SceneUiTest2で呼び出す前に定義すべきだから。
class SampleDialog extends UI.UI_FreeContainer {
  constructor({ onClose } = {}) {
    // UI_FreeContainerで下敷きを生成
    const bgbase = new UI.UI_FreeContainer({
      left: '50%',
      top: '50%',
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 1999,
      position: 'fixed',
      className: 'sample-dialog-overlay',
      parent: document.body,
      onClick: () => this.close()
    });

    super({
      width: 320,
      height: 180,
      backgroundColor: '#fff',
      borderRadius: 16,
      zIndex: 2000,
      position: 'fixed',
      left: '50%',
      top: '50%',
      className: 'sample-dialog',
      parent: document.body
    });
    this._bgbase = bgbase;
    this._onClose = onClose;

    // 閉じるボタン
    const closeBtn = new UI.UI_TxtBtn({
      text: '×',
      width: 40,
      height: 40,
      backgroundColor: '#e44',
      textColor: '#fff',
      fontSize: 22,
      onClick: () => this.close()
    });
    this.add(closeBtn, { right: '5%', top: '15%' });
  
    // サンプルテキスト
    const label = new UI.UI_TxtBox({
      text: 'This is a sample dialog.',
      width: 200,
      height: 40,
      backgroundColor: 'transparent',
      textColor: '#222',
      fontSize: 18
    });
    this.add(label, { left: '50%', top: '50%' });
  }

  /**
   * ダイアログとオーバーレイを閉じる（共通処理）
   */
  close() {
    this.el.remove();
    if (this._bgbase && this._bgbase.el && this._bgbase.el.parentNode) this._bgbase.el.remove();
    if (typeof this._onClose === 'function') this._onClose();
  }
}

/** * SceneUiTest2クラス
 * UIコンポーネントのテストシーン
 */
export class SceneUiTest2 extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneUiTest2' });
  }

  create() {
    // Phaser canvasの背景色を薄い紫に
    this.cameras.main.setBackgroundColor('rgba(237, 230, 250, 1)');
    console.log(`${this.scene.key} created`);

    this.events.on('shutdown', this.shutdown, this);
    this.events.on('destroy', this.shutdown, this);

    // 戻り先シーン名をdata.fromから取得（なければSceneUiTest）
    const data = arguments[0] || {};
    const returnScene = data.from || 'SceneUiTest';
    this.backButton = new UI.UI_TxtBtn({
      text: `Back`,
      backgroundColor: '#28a745',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      width: 200,
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '10%',
      zIndex: 1000,
      scene: this,
      gotoScene: returnScene
    });

    // --- UI_GridContainer 横スクロール サンプル ---
    this.gridH = new UI.UI_GridContainer({
      rows: 1,
      cols: 6,
      gap: 8,
      width: 400,
      height: 100,
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '20%',
      zIndex: 1000,
      center: true
    });

    this.gridBtnsH = [];
    for (let r = 0; r < 1; r++) {
      for (let c = 0; c < 6; c++) {
        const btn = new UI.UI_TxtBtn({
          text: `(${r+1},${c+1})`,
          fontSize: 18,
          width: 100,
          height: 40,
          backgroundColor: '#444',
          textColor: '#fff',
          left: '50%',
          top: '50%',
        });
        this.gridH.addChild(btn, r, c);
        this.gridBtnsH.push(btn);
        console.log(`Added buttonH at (${r+1},${c+1})`);
      }
    }

    // --- UI_GridContainer 縦スクロール サンプル ---
    this.gridV = new UI.UI_GridContainer({
      rows: 6,
      cols: 1,
      gap: 8,
      width: 400,
      height: 200,
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '40%',
      zIndex: 1000,
      center: true
    });

    this.gridBtnsV = [];
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 1; c++) {
        const btn = new UI.UI_TxtBtn({
          text: `(${r+1},${c+1})`,
          fontSize: 18,
          width: 100,
          height: 40,
          backgroundColor: '#444',
          textColor: '#fff',
          left: '50%',
          top: '50%',
          //center: true
        });
        this.gridV.addChild(btn, r, c);
        this.gridBtnsV.push(btn);
        console.log(`Added buttonV at (${r+1},${c+1})`);
      }
    }

    // --- UI_FreeContainer サンプル ---
    this.freeContainer = new UI.UI_FreeContainer({
      width: 400,
      height: 300,
      backgroundColor: 'rgba(1, 136, 141, 1)',
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '70%',
      zIndex: 1000,
      borderRadius: 30,
    });

    // UI_TxtBox
    const txtBox = new UI.UI_TxtBox({
      text: 'Sample TextBox',
      width: 200,
      height: 40,
      backgroundColor: '#fff',
      textColor: '#222',
      fontSize: 18
    });
    this.freeContainer.add(txtBox, { left: '0%', top: '10%' });

    // UI_TxtBtn
    const txtBtn = new UI.UI_TxtBtn({
      text: 'Text Button',
      width: 140,
      height: 40,
      backgroundColor: '#28a745',
      textColor: '#fff',
      fontSize: 18
    });
    this.freeContainer.add(txtBtn, { left: '30%', top: '20%' });

    // UI_ImgBtn
    const imgBtn = new UI.UI_ImgBtn({
      imageSrc: 'Images/BtnGreen.png',
      text: 'ImgBtn',
      fontSize: 16
    });
    this.freeContainer.add(imgBtn, { left: '100%', top: '70%' });

    // UI_GridContainer (縦3ボタン)
    const grid = new UI.UI_GridContainer({
      rows: 3,
      cols: 1,
      width: 120,
      height: 150,
      parent: undefined,
      backgroundColor: '#e0e0f0',
    });
    for (let r = 0; r < 6; r++) {
      const btn = new UI.UI_TxtBtn({
        text: `GridBtn${r+1}`,
        width: 100,
        height: 40,
        backgroundColor: '#444',
        textColor: '#fff',
        fontSize: 16,
        left: '50%',
        top: '50%'
      });
      grid.addChild(btn, r, 0);
    }
    this.freeContainer.add(grid, { left: '50%', top: '50%' });

    this.dialogButton = new UI.UI_TxtBtn({
      text: 'Dialog Button',
      backgroundColor: '#007bff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      onClick: () => {
        if (!this.sampleDialog) {
          this.sampleDialog = new SampleDialog({
            onClose: () => { this.sampleDialog = null; }
          });
        } else {
          if (!document.body.contains(this.sampleDialog.el)) {
            document.body.appendChild(this.sampleDialog.el);
          }
        }
        this.sampleDialog.el.style.display = '';
      },
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '90%',
      zIndex: 1000,
    });

  }

  shutdown() {
    // document.body配下のUI_BaseComponent系要素を一括destroy
    const uiEls = Array.from(document.body.querySelectorAll('[data-ui-component]'));
    uiEls.forEach(el => {
      if (el.__uiInstance && typeof el.__uiInstance.destroy === 'function') {
        el.__uiInstance.destroy();
      } else {
        el.remove();
      }
    });
  }
}
