import * as UI from '../UIcomponents/index.js';

export class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  create() {
    // Phaser canvasの背景色を薄い紫に
    this.cameras.main.setBackgroundColor(UI.UI_ThemeColors.background);
    console.log(`${this.scene.key} created`);

    this.events.off('shutdown', this.shutdown, this);
    this.events.off('destroy', this.shutdown, this);
    this.events.on('shutdown', this.shutdown, this);
    this.events.on('destroy', this.shutdown, this);

        // 戻り元シーン名をdata.fromから取得（なければSceneUiTest）
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

    // 1. テキストボタン（中央やや上）
    this.btnNewGame = new UI.UI_TxtBtn({
      text: 'New Game',
      backgroundColor: '#007bff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      onClick: () => {
        console.log('New Game Button Pressed');
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '10%',
      zIndex: 1000,
      width: 200,
      scene: this,
      gotoScene: 'SceneUiTest' // シーン遷移のための設定
    });

    this.btnContinue = new UI.UI_TxtBtn({
      text: 'Continue',
      backgroundColor: '#007bff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      onClick: () => {
        console.log('Continue Button Pressed');
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '20%',
      zIndex: 1000,
      width: 200,
      scene: this,
    });

    this.btnSettings = new UI.UI_TxtBtn({
      text: 'Settings',
      backgroundColor: '#007bff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      onClick: () => {
        console.log('Settings Button Pressed');
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '30%',
      zIndex: 1000,
      width: 200,
      scene: this,
      gotoScene: 'SceneMainMenu' // シーン遷移のための設定
    });

  }

  shutdown() {
    // UI親コンテナのみdestroy（配下DOMもまとめて破棄）
    console.log(`shutdown: ${this.scene.key} (${this.timestamp}) `);
    if (this.uiParent && typeof this.uiParent.destroy === 'function') {
      this.uiParent.destroy();
    }
  }
}