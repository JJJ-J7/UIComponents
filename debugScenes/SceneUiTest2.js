import * as UI from '../UIcomponents/index.js';

// サンプルダイアログクラス
// 先頭に書くのはclass SceneUiTest2で呼び出す前に定義すべきだから。
class SampleDialog extends UI.UI_FreeContainer {
  constructor({ 
    x,
    y,
    width = window.innerWidth,
    height = window.innerHeight,
    backgroundColor = `transparent`,
    borderRadius,
    className = 'sample-dialog',
    parent = document.body,
    position = 'fixed',
    left = '50%',
    top = '50%',
    right,
    bottom,
    zIndex = 2000,
    center = true,
    scene = null,
    opacity = 1.0,
   } = {}) {

    // 空枠として親クラスの UI_FreeContainer のコンストラクタを呼び出す
    super({ 
      x,
      y,
      width,
      height,
      backgroundColor,
      borderRadius,
      className,
      parent,
      position,
      left,
      top,
      right,
      bottom,
      zIndex,
      center,
      scene,
      opacity,
     });

    // UI_FreeContainerで下敷きを生成
    const bgbase = new UI.UI_FreeContainer({
      left: '50%',
      top: '50%',
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: UI.UI_ThemeColors.bgbase,
      zIndex: 0,
      position: 'fixed',
      className: 'sample-dialog-overlay',
      parent: this.el,
      onClick: () => this.close(),
      scene: scene, // 現在のシーンを設定
    });
    this.el.appendChild(bgbase.el);
    this._bgbase = bgbase;

    // ダイアログ本体
    const dialogBody = new UI.UI_FreeContainer({
      width: 320,
      height: 180,
      left: '50%',
      top: '50%',
      backgroundColor: UI.UI_ThemeColors.background,
      borderRadius: 16,
      //zIndex: 1000,
      position: 'fixed',
      className: 'dialog-body',
      parent: this.el,
      scene: scene, // 現在のシーンを設定
    });
    this.add(dialogBody, { right: '50%', top: '50%' });    
    
    // 閉じるボタン
    const closeBtn = new UI.UI_TxtBtn({
      text: '×',
      width: 40,
      height: 40,
      backgroundColor: '#e44',
      parent: this.el,
      textColor: '#fff',
      fontSize: 22,
      onClick: () => this.close(),
      scene: scene, // 現在のシーンを設定
    });
    dialogBody.add(closeBtn, { right: '5%', top: '15%' });
  
    // サンプルテキスト
    const label = new UI.UI_TxtBox({
      text: 'This is a sample dialog.',
      width: 200,
      height: 40,
      parent: this.el,
      backgroundColor: 'transparent',
      textColor: UI.UI_ThemeColors.txtDark,
      fontSize: 18,
      scene: scene, // 現在のシーンを設定
    });
    dialogBody.add(label, { left: '50%', top: '50%' });
  }

  /**
   * ダイアログとオーバーレイを閉じる（共通処理）
   */
  close() {
    console.log('Dialog closed');
    this.fadeOut({ isDestroy: true });
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
    this.cameras.main.setBackgroundColor(UI.UI_ThemeColors.background);
    console.log(`${this.scene.key} created`);

    //document.body.style.transition = 'opacity 0.4s';
    //document.body.style.opacity = '1.0';
    
    // イベントリスナー多重登録防止
    this.events.off('shutdown', this.shutdown, this);
    this.events.off('destroy', this.shutdown, this);
    this.events.on('shutdown', this.shutdown, this);
    this.events.on('destroy', this.shutdown, this);

    

    // 戻り先シーン名をdata.fromから取得（なければSceneUiTest）
    const data = arguments[0] || {};
    const returnScene = data.from || 'SceneUiTest';

    // 0. UI親
    this.uiParent = new UI.UI_FreeContainer({
      className: UI.UI_Settings.uiParentClassName,
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '50%',
      width: innerWidth,
      height: innerHeight,
      zIndex: 1000,
      center: true,
      scene: this, // 現在のシーンを設定
      opacity: 0.0,
    });
    // DOMフェードイン
    this.uiParent.fadeIn({ delay: UI.UI_Settings.crossFadeDelay });

    // 1. 戻るボタン（中央やや上）
    this.backButton = new UI.UI_TxtBtn({
      text: `Back`,
      backgroundColor: '#28a745',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      width: 200,
      parent: this.uiParent.el,
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
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '20%',
      zIndex: 1000,
      center: true,
      scene: this, // 現在のシーンを設定
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
          scene: this, // 現在のシーンを設定
        });
        this.gridH.addChild(btn, r, c);
        this.gridBtnsH.push(btn);
        //console.log(`Added buttonH at (${r+1},${c+1})`);
      }
    }

    // --- UI_GridContainer 縦スクロール サンプル ---
    this.gridV = new UI.UI_GridContainer({
      rows: 6,
      cols: 1,
      gap: 8,
      width: 400,
      height: 200,
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '40%',
      zIndex: 1000,
      center: true,
      scene: this // 現在のシーンを設定
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
          scene: this, // 現在のシーンを設定
        });
        this.gridV.addChild(btn, r, c);
        this.gridBtnsV.push(btn);
        //console.log(`Added buttonV at (${r+1},${c+1})`);
      }
    }

    // --- UI_FreeContainer サンプル ---
    this.freeContainer = new UI.UI_FreeContainer({
      width: 400,
      height: 300,
      backgroundColor: 'rgba(1, 136, 141, 1)',
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '70%',
      zIndex: 1000,
      borderRadius: 30,
      scene: this, // 現在のシーンを設定
    });

    // UI_TxtBox
    const txtBox = new UI.UI_TxtBox({
      text: 'Sample TextBox',
      width: 200,
      height: 40,
      backgroundColor: '#fff',
      textColor: '#222',
      fontSize: 18,
      scene: this, // 現在のシーンを設定
    });
    this.freeContainer.add(txtBox, { left: '0%', top: '10%' });

    // UI_TxtBtn
    const txtBtn = new UI.UI_TxtBtn({
      text: 'Text Button',
      width: 140,
      height: 40,
      backgroundColor: '#28a745',
      textColor: '#fff',
      fontSize: 18,
      scene: this, // 現在のシーンを設定
    });
    this.freeContainer.add(txtBtn, { left: '30%', top: '20%' });

    // UI_ImgBtn
    const imgBtn = new UI.UI_ImgBtn({
      imageSrc: 'Images/BtnGreen.png',
      text: 'ImgBtn',
      fontSize: 16,
      backgroundColor: 'transparent',
      scene: this, // 現在のシーンを設定
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
      scene: this, // 現在のシーンを設定
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
        top: '50%',
        scene: this, // 現在のシーンを設定
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
        this.sampleDialog = null;
        if (!this.sampleDialog) {
          this.sampleDialog = new SampleDialog({
            parent: this.uiParent.el,
            scene: this, // 現在のシーンを設定
            opacity: 0.0,
          });
          this.sampleDialog.fadeIn();
        }
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '90%',
      zIndex: 1000,
      scene: this, // 現在のシーンを設定
    });

  }

  shutdown() {
    // UI親コンテナのみdestroy（配下DOMもまとめて破棄）
    console.log(`${this.scene.key} shutdown`);
    if (this.uiParent && typeof this.uiParent.destroy === 'function') {
      this.uiParent.destroy();
    }
  }
}
