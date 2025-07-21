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
    this.backButton = new UI.UI_TextButton({
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
  }

  shutdown() {
    if (this.backButton) this.backButton.destroy();
  }
}
