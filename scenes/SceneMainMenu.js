import * as UI from '../UIcomponents/index.js';

export class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  create() {
    // Phaser canvasの背景色を薄い紫に
    this.cameras.main.setBackgroundColor(UI.UI_ThemeColors.background);
    console.log(`${this.scene.key} created`);
    
    this.events.on('shutdown', this.shutdown, this);
    this.events.on('destroy', this.shutdown, this);
    

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
      parent: document.body,
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
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '20%',
      zIndex: 1000,
      width: 200,
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
      parent: document.body,
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