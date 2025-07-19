import { OtherScene } from './otherScene.js';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [
    { preload, create, update, key: 'default' },
    OtherScene
  ]
};

let game;
let dbPromise;

// IndexedDB初期化
// idb は indexedDBのラッパーライブラリで、これを使ってカウンターの値を保存・取得します
async function initDB() {
  dbPromise = idb.openDB('counter-db', 1, { // バージョン1で初期化。DB構成が変わる場合はバージョンを上げる
    upgrade(db) {
      db.createObjectStore('store');
    }
  });
}

// IndexedDBからカウンタ値を取得
async function loadCounter() {
  const db = await dbPromise;
  const value = await db.get('store', 'counter');
  return value ?? 0;
}

// IndexedDBにカウンタ値を保存
async function saveCounter(value) {
  const db = await dbPromise;
  await db.put('store', value, 'counter');
}

// シーンのpreloadメソッド。Phaser のシーン管理の基本メソッド。
// ここで必要なアセットをロードします。
function preload() {
  this.load.image('logo', 'Images/blueR.png');
  //this.load.image('logo', 'https://labs.phaser.io/assets/sprites/phaser3-logo.png');
}

// シーンのcreateメソッド。Phaser のシーン管理の基本メソッド。
// ここでゲームの初期化やオブジェクトの配置を行います
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
  this.graphics = this.add.graphics();
  this.buttonWidth = 200;
  this.buttonHeight = 60;
  this.buttonX = this.scale.width / 2 - this.buttonWidth / 2;
  this.buttonY = this.scale.height - this.buttonHeight - 200;

  this.graphics.fillStyle(0x007bff, 1);
  this.graphics.fillRoundedRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight, 20);

  // ボタンテキスト
  const buttonText = this.add.text(
    this.scale.width / 2, 
    this.buttonY + this.buttonHeight / 2, 
    'Click Me', 
    { fontSize: '24px', color: '#fff' }
  ).setOrigin(0.5);

  // 透明なインタラクティブゾーンを重ねてボタン化
  const buttonZone = this.add.zone(
    this.scale.width / 2, 
    this.buttonY + this.buttonHeight / 2, 
    this.buttonWidth, 
    this.buttonHeight
  ).setOrigin(0.5).setInteractive();

  // IndexedDBからカウンタ値を読み込んでセット
  loadCounter().then(value => {
    this.counter = value;
    this.titleText.setText(`Hello Phaser! ${this.counter}`);
  });

  // ボタン押下でカウントアップ＆保存
  buttonZone.on('pointerdown', () => {
    this.counter++;
    this.titleText.setText(`Hello Phaser! ${this.counter}`);
    saveCounter(this.counter);
  });

  // シーンジャンプ用ボタンのサイズ・位置
  const jumpBtnWidth = 160;
  const jumpBtnHeight = 50;
  const jumpBtnX = this.scale.width - jumpBtnWidth / 2 - 20;
  const jumpBtnY = this.scale.height - jumpBtnHeight / 2 - 100;

  // シーンジャンプ用ボタンのグラフィック
  this.jumpBtnGraphics = this.add.graphics();
  this.jumpBtnGraphics.fillStyle(0x28a745, 1);
  this.jumpBtnGraphics.fillRoundedRect(
    jumpBtnX - jumpBtnWidth / 2,
    jumpBtnY - jumpBtnHeight / 2,
    jumpBtnWidth,
    jumpBtnHeight,
    16
  );

  // シーンジャンプ用ボタンのテキスト
  const jumpBtnText = this.add.text(
    jumpBtnX,
    jumpBtnY,
    'シーン切替',
    { fontSize: '22px', color: '#fff' }
  ).setOrigin(0.5);

  // インタラクティブゾーン
  const jumpBtnZone = this.add.zone(
    jumpBtnX,
    jumpBtnY,
    jumpBtnWidth,
    jumpBtnHeight
  ).setOrigin(0.5).setInteractive();

  // シーンジャンプ処理
  jumpBtnZone.on('pointerdown', () => {
    this.scene.start('OtherScene');
  });

  // リサイズ時の再配置
  this.scale.on('resize', (gameSize) => {
    const { width, height } = gameSize;

    //this.logo.setPosition(width / 4, height / 4);
    this.titleText.setPosition(width / 2, height / 2);

    // カウントアップボタンの位置を更新
    this.buttonX = width / 2 - this.buttonWidth / 2;
    this.buttonY = height - this.buttonHeight - 40;

    this.graphics.clear();
    this.graphics.fillStyle(0x007bff, 1);
    this.graphics.fillRoundedRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight, 20);
    buttonText.setPosition(width / 2, height - this.buttonHeight / 2 - 40);
    buttonZone.setPosition(width / 2, height - this.buttonHeight / 2 - 40);

    const newX = width - jumpBtnWidth / 2 - 20;
    const newY = height - jumpBtnHeight / 2 - 20;
    this.jumpBtnGraphics.clear();
    this.jumpBtnGraphics.fillStyle(0x28a745, 1);
    this.jumpBtnGraphics.fillRoundedRect(
      newX - jumpBtnWidth / 2,
      newY - jumpBtnHeight / 2,
      jumpBtnWidth,
      jumpBtnHeight,
      16
    );
    jumpBtnText.setPosition(newX, newY);
    jumpBtnZone.setPosition(newX, newY);
  });
}

// updateメソッドを追加。Phaser のシーン管理の基本メソッド。
function update(time) {
  // timeはms単位
  const t = time / 1000; // 秒単位に変換
  // 0.5～1.0で明滅
  const alpha = 0.75 + 0.25 * Math.sin(t * 2); // 2は速さ。小さくするとゆっくり

  // ボタン再描画
  this.graphics.clear();
  this.graphics.fillStyle(0x007bff, alpha);
  this.graphics.fillRoundedRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight, 20);
}

// 初期化とService Worker登録
window.addEventListener("load", async () => {
  await initDB();

  let gameInitError = null;
  try {
    game = new Phaser.Game(config);
  } catch (e) {
    gameInitError = e;
    console.error("Phaser.Gameの初期化に失敗:", e);
  }

  // Phaserの初期化に失敗してもService Workerは登録する
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  }

  // 必要ならエラー表示
  if (gameInitError) {
    const errMsg = document.createElement('div');
    errMsg.textContent = "ゲームの初期化に失敗しました。";
    errMsg.style.color = "red";
    errMsg.style.fontSize = "20px";
    errMsg.style.position = "absolute";
    errMsg.style.top = "20px";
    errMsg.style.left = "20px";
    document.body.appendChild(errMsg);
  }
});