import * as UI from '../UIcomponents/index.js';

export class SceneUiTest extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneUiTest' });
  }

  create() {
    // Phaser canvasの背景色を薄い紫に
    this.cameras.main.setBackgroundColor(UI.UI_ThemeColors.background);

    // Phaser シーンのインスタンスは再利用されるため、
    // 2回以上同じシーンに遷移した場合、前回のインスタンス変数が残されてることに注意。
    // そのため、必要に応じて初期化処理を行うこと。
    if (this.timestamp) {
      console.log(`ghost time: ${this.timestamp}`); //前回のインスタンスから残留しているもの
    }
    this.timestamp = Date.now();
    console.log(`create: ${this.scene.key} (${this.timestamp})`);

    // イベントリスナー多重登録防止
    // イベントリスナーはシーンのライフサイクルに合わせて登録・解除することが推奨される
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
    this.textButton = new UI.UI_TxtBtn({
      text: 'Jump Button',
      backgroundColor: '#007bff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      onClick: () => {
        console.log('Jump Button Pressed');
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '10%',
      zIndex: 1000,
      scene: this,
      gotoScene: 'SceneUiTest2', // シーン遷移のための設定
      sceneKey: this.scene.key // 現在のシーンキーを設定
    });

    this.textButton2 = new UI.UI_TxtBtn({
      text: 'Invalid Button',
      backgroundColor: '#007bff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      onClick: () => {
        console.log('Text Button2 Pressed');
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '20%',
      zIndex: 1000,
      enabled: false, // 無効化
      scene: this // 現在のシーンを設定
    });

    this.textButton3 = new UI.UI_TxtBtn({
      text: 'Start Button',
      backgroundColor: '#007bff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      onClick: () => {
        console.log('Start Button Pressed');
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '30%',
      zIndex: 1000,
      scene: this,
      gotoScene: 'SceneMainMenu', // シーン遷移のための設定
    });

    this.textButton4 = new UI.UI_TxtBtn({
      text: 'Reset Button',
      backgroundColor: '#ff0037ff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      onClick: () => {
        console.log('Reset Button Pressed');
        // Service Workerのキャッシュを全削除し、ページをリロード
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(regs => {
            return Promise.all(regs.map(r => r.unregister()));
          }).then(() => {
            // キャッシュも削除
            if ('caches' in window) {
              caches.keys().then(keys => {
                return Promise.all(keys.map(key => caches.delete(key)));
              }).then(() => {
                location.reload();
              });
            } else {
              location.reload();
            }
          });
        } else {
          location.reload();
        }
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '30%',
      zIndex: 1000,
      scene: this,
      gotoScene: 'SceneMainMenu', // シーン遷移のための設定
    });

    // 2. 画像（中央）
    this.uiImage = new UI.UI_Img({
      src: 'Images/blueR.png',
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '50%',
      className: 'sample-ui-image',
      backgroundColor: 'transparent',
      scale: 0.2,
      //center: true
      scene: this, // 現在のシーンを設定
    });

    // 3. 画像ボタン（中央やや下）
    this.imgButton = new UI.UI_ImgBtn({
      imageSrc: 'Images/BtnGreen.png',
      onClick: () => {
        console.log('Image Button Pressed');
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '60%',
      zIndex: 1000,
      scale: 1,
      backgroundColor: 'transparent',
      scene: this, // 現在のシーンを設定
    });

    this.imgButton2 = new UI.UI_ImgBtn({
      imageSrc: 'Images/BtnGreen.png',
      onClick: () => {
        console.log('Image Button2 Pressed');
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '80%',
      top: '60%',
      zIndex: 1000,
      scale: 1,
      backgroundColor: 'transparent',
      enabled: false, // 無効化
      scene: this, // 現在のシーンを設定
    });

    // 4. テキストボックス（中央やや下）
    this.textBox = new UI.UI_TxtBox({
      text: 'Sample TextBox',
      backgroundColor: '#222',
      textColor: '#fff',
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '70%',
      className: 'sample-ui-textbox',
      scene: this, // 現在のシーンを設定
    });

    // 5. 画像＋テキストボタン（中央さらに下）
    this.imgTextButton = new UI.UI_ImgTxtBtn({
      imageSrc: 'Images/BtnGreen.png',
      text: 'Image+Text',
      fontSize: 20,
      onClick: () => {
        console.log('ImageText Button Pressed');
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '85%',
      zIndex: 1000,
      scene: this, // 現在のシーンを設定
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