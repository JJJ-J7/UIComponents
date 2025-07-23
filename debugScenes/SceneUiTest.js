import * as UI from '../UIcomponents/index.js';

export class SceneUiTest extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneUiTest' });
  }

  create() {
    // Phaser canvasの背景色を薄い紫に
    this.cameras.main.setBackgroundColor(UI.UI_ThemeColors.background);
    console.log(`${this.scene.key} created`);
    
    this.events.on('shutdown', this.shutdown, this);
    this.events.on('destroy', this.shutdown, this);
    

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
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '10%',
      zIndex: 1000,
      scene: this,
      gotoScene: 'SceneUiTest2' // シーン遷移のための設定
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
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '20%',
      zIndex: 1000,
      enabled: false // 無効化
    });

    // 2. 画像（中央）
    this.uiImage = new UI.UI_Img({
      src: 'Images/blueR.png',
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '30%',
      className: 'sample-ui-image',
      backgroundColor: 'transparent',
      scale: 0.2,
      //center: true
    });

    // 3. 画像ボタン（中央やや下）
    this.imgButton = new UI.UI_ImgBtn({
      imageSrc: 'Images/BtnGreen.png',
      onClick: () => {
        console.log('Image Button Pressed');
      },
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '50%',
      zIndex: 1000,
      scale: 1
    });

    this.imgButton2 = new UI.UI_ImgBtn({
      imageSrc: 'Images/BtnGreen.png',
      onClick: () => {
        console.log('Image Button2 Pressed');
      },
      parent: document.body,
      position: 'fixed',
      left: '80%',
      top: '50%',
      zIndex: 1000,
      scale: 1,
      enabled: false // 無効化
    });

    // 4. テキストボックス（中央やや下）
    this.textBox = new UI.UI_TxtBox({
      text: 'Sample TextBox',
      backgroundColor: '#222',
      textColor: '#fff',
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '70%',
      className: 'sample-ui-textbox'
    });

    // 5. 画像＋テキストボタン（中央さらに下）
    this.imgTextButton = new UI.UI_ImgTxtBtn({
      imageSrc: 'Images/BtnGreen.png',
      text: 'Image+Text',
      fontSize: 20,
      onClick: () => {
        console.log('ImageText Button Pressed');
      },
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '85%',
      zIndex: 1000
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