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
}

function create() {
  this.logo = this.add.image(this.scale.width / 2, this.scale.height / 2, 'logo');

  // リサイズ時にロゴを中央に再配置
  this.scale.on('resize', (gameSize) => {
    const { width, height } = gameSize;
    this.logo.setPosition(width / 2, height / 2);
  });
}

// 初期化とService Worker登録
window.addEventListener("load", () => {
  //game = new Phaser.Game(config);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  }
});