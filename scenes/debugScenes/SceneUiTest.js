import { UI_TextButton } from '../../UIcomponents/UI_TextButton.js';

export class SceneUiTest extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneUiTest' });
  }

  create() {
    console.log('SceneUiTest created');

    this.textButton = new UI_TextButton({
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
      top: '50%',
      zIndex: 1000
    });
    // 中央配置のためにtransformを追加
    //this.textButton.el.style.transform = 'translate(-50%, -50%)';
  }

  shutdown() {
    if (this.textButton) this.textButton.destroy();
  }
}