import { SceneUiTest } from './debugScenes/SceneUiTest.js';
import { SceneUiTest2 } from './debugScenes/SceneUiTest2.js';
import { SceneOther } from './debugScenes/SceneOther.js';
import { SceneMainMenu } from './SceneMainMenu.js';

// IndexedDBラッパーの初期化・永続化
let dbPromise;
async function initDB() {
  dbPromise = idb.openDB('counter-db', 1, {
    upgrade(db) {
      db.createObjectStore('store');
    }
  });
  // グローバルに公開（シーンから呼び出しやすくするため）
  window.loadCounter = async function() {
    const db = await dbPromise;
    const value = await db.get('store', 'counter');
    return value ?? 0;
  };
  window.saveCounter = async function(value) {
    const db = await dbPromise;
    await db.put('store', value, 'counter');
  };
}

// launchMode: 0=UiTestScene, 1=MainMenuScene
const launchMode = 0; // 必要に応じて 0 または 1 に変更

// ダミーシーンを先頭に追加
// これにより、Phaserのシーンスタックが正しく機能する
class DummyScene extends Phaser.Scene {
  constructor() { super({ key: 'DummyScene' }); }
  create() {}
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  parent: 'phaser-container',
  scene: [
    DummyScene,      // 先頭はダミー
    SceneUiTest,
    SceneUiTest2,
    SceneOther,
    SceneMainMenu
  ]
};

window.addEventListener("load", async () => {
  await initDB();

  let gameInitError = null;
  let game = null;
  try {
    game = new Phaser.Game(config);
  } catch (e) {
    gameInitError = e;
    console.error("Phaser.Gameの初期化に失敗:", e);
  }

  // Service Worker登録は必ず実行
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  }

  if (gameInitError) {
    const errMsg = document.createElement('div');
    errMsg.textContent = "ゲームの初期化に失敗しました。";
    errMsg.style.color = "red";
    errMsg.style.fontSize = "20px";
    errMsg.style.position = "absolute";
    errMsg.style.top = "20px";
    errMsg.style.left = "20px";
    document.body.appendChild(errMsg);
    return;
  }

  // すべての初期化が完了してから自動ジャンプ
  game.events.once('ready', () => {
    if (launchMode === 1) {
      game.scene.start('SceneMainMenu');
    } else {
      game.scene.start('SceneUiTest');
    }
  });
});