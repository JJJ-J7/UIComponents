import * as UI from '../../UIcomponents/index.js';

export class SceneUiTest extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneUiTest' });
  }

  create() {
    console.log('SceneUiTest created');

    // 1. テキストボタン（中央やや上）
    this.textButton = new UI.UI_TextButton({
      text: 'Test Button',
      backgroundColor: '#007bff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      width: 160,
      height: 48,
      onClick: () => {
        console.log('Text Button Pressed');
      },
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '10%',
      zIndex: 1000
    });

    this.textButton2 = new UI.UI_TextButton({
      text: 'Invalid Button',
      backgroundColor: '#007bff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      width: 160,
      height: 48,
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
    this.uiImage = new UI.UI_Image({
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
    this.imgButton = new UI.UI_ImageButton({
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

    this.imgButton2 = new UI.UI_ImageButton({
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
    this.textBox = new UI.UI_TextBox({
      text: 'Sample TextBox',
      width: 180,
      height: 40,
      backgroundColor: '#222',
      textColor: '#fff',
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '70%',
      className: 'sample-ui-textbox'
    });
  }

  shutdown() {
    if (this.textButton) this.textButton.destroy();
    if (this.uiImage) this.uiImage.destroy();
    if (this.imgButton) this.imgButton.destroy();
    if (this.textBox) this.textBox.destroy();
  }
}