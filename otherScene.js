export class OtherScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OtherScene' });
  }

  create() {
    this.add.text(this.scale.width / 2, this.scale.height / 2, '別のシーンです', {
      fontSize: '32px',
      color: '#fff'
    }).setOrigin(0.5);

    // 戻るボタン例
    const backBtn = this.add.text(this.scale.width / 2, this.scale.height - 80, '戻る', {
      fontSize: '28px',
      color: '#0ff',
      backgroundColor: '#333',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    backBtn.on('pointerdown', () => {
      this.scene.start('default'); // メインシーン名に合わせて変更
    });
  }
}

// モジュールとしてエクスポート（ESMの場合）
// export default OtherScene;
window.OtherScene = OtherScene; // グローバル登録（scriptタグ利用時）