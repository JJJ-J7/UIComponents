const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload,
    create
  }
};

let game;

function preload() {
  this.load.image('logo', 'Images/blueR.png');
  //this.load.image('logo', 'https://labs.phaser.io/assets/sprites/phaser3-logo.png');
}

function create() {
  //this.logo = this.add.image(this.scale.width / 4, this.scale.height / 4, 'logo');

  // カウンタ変数を追加
  this.counter = 0;

  // テキストを中央に追加
  this.titleText = this.add.text(
    this.scale.width / 2, 
    this.scale.height / 2, 
    `Hello Phaser! ${this.counter}`,
    { fontSize: '32px', color: '#ffffff' }
  ).setOrigin(0.5);

  // ボタン画像をロードしていない場合は、四角形＋テキストで簡易ボタン
  const buttonWidth = 200;
  const buttonHeight = 60;
  const buttonX = this.scale.width / 2 - buttonWidth / 2;
  const buttonY = this.scale.height - buttonHeight - 40;

  // ボタン用グラフィック
  const graphics = this.add.graphics();
  graphics.fillStyle(0x007bff, 1);
  graphics.fillRoundedRect(buttonX, buttonY, buttonWidth, buttonHeight, 20);

  // ボタンテキスト
  const buttonText = this.add.text(
    this.scale.width / 2, 
    buttonY + buttonHeight / 2, 
    'Click Me', 
    { fontSize: '24px', color: '#fff' }
  ).setOrigin(0.5);

  // 透明なインタラクティブゾーンを重ねてボタン化
  const buttonZone = this.add.zone(
    this.scale.width / 2, 
    buttonY + buttonHeight / 2, 
    buttonWidth, 
    buttonHeight
  ).setOrigin(0.5).setInteractive();

  // ボタン押下でカウントアップ
  buttonZone.on('pointerdown', () => {
    this.counter++;
    this.titleText.setText(`Hello Phaser! ${this.counter}`);
  });

  // リサイズ時に再配置
  this.scale.on('resize', (gameSize) => {
    const { width, height } = gameSize;
    //this.logo.setPosition(width / 4, height / 4);
    this.titleText.setPosition(width / 2, height / 2);
    graphics.clear();
    graphics.fillStyle(0x007bff, 1);
    graphics.fillRoundedRect(width / 2 - buttonWidth / 2, height - buttonHeight - 40, buttonWidth, buttonHeight, 20);
    buttonText.setPosition(width / 2, height - buttonHeight / 2 - 40);
    buttonZone.setPosition(width / 2, height - buttonHeight / 2 - 40);
  });
}

// 初期化とService Worker登録
window.addEventListener("load", () => {
  game = new Phaser.Game(config);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  }
});