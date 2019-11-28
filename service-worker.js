
const CACHE_NAME = "firstpwa-v1";
var urlsToCache = [
  "/",
  "/icon.png",
  "/icon_apple.png",
  "/index.html",
  "/manifest.json",
  "/nav.html",
  "/service-worker.js",
  "/css/materialize.min.css",
  "/css/style.css",
  "/img/amata-wedding-logo.png",
  "/img/balloon-icon.png",
  "/img/bride.jpg",
  "/img/brides-dad.jpg",
  "/img/brides-mom.jpg",
  "/img/bridesmaid.jpg",
  "/img/car-icon.png",
  "/img/gift-icon.png",
  "/img/glass-icon.png",
  "/img/groom.jpg",
  "/img/grooms-dad.jpg",
  "/img/grooms-mom.jpg",
  "/img/groomsman.jpg",
  "/img/live-music.jpg",
  "/img/ring-icon.png",
  "/img/slide-1.jpg",
  "/img/tempat.jpg",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/counter.js",
  "/js/script.js",
  "/pages/home.html",
  "/pages/bigFamily.html",
  "/pages/bridegroom.html",
  "/pages/guestBook.html",
  "/pages/theParty.html",
  "https://fonts.googleapis.com/css?family=Roboto",
  "https://code.jquery.com/jquery-3.4.1.min.js",
  "https://use.fontawesome.com/releases/v5.7.2/css/all.css",
  "https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-solid-900.woff2",
  "https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-solid-900.woff",
  "https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-solid-900.ttf"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


// untuk menggunakan asset dari cache

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});



// untuk menghapus cache lama dari sisi pengguna

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});