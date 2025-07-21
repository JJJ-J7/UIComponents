import * as UI from '../../UIcomponents/index.js';

export class SceneUiTest2 extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneUiTest2' });
  }

  create() {
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
      height: 70,
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
