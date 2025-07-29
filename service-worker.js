const CACHE_NAME = "phaser-pwa-v1";
// const urlsToCache = [
//   "./index.html",
//   "./manifest.json",
//   "./icon256.png",
//   "./main.js",
//   "./style.css",
//   "./Images/blueR.png",
//   "./lib/phaser.js"
// ];

// インストール時にキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    fetch("urlsToCache.json")
      .then((res) => res.json())
      .then((urlsToCache) =>
        caches.open(CACHE_NAME).then((cache) => {
          return cache.addAll(urlsToCache);
        })
      )
  );
  console.log("Service Worker installed and cache created.");
});

// オフライン対応：キャッシュ優先
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
          return caches.match("./index.html");  // オフライン時はindex.htmlを返す
        });
    })
  );
  
});

// 古いキャッシュを削除
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});