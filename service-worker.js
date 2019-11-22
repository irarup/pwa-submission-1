
const CACHE_NAME = "firstpwa-v4";
var urlsToCache = [
  "/",
  "/icon.png",
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
  "/img/slide-2.jpg",
  "/img/slide-3.jpg",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/counter.js",
  "/js/script.js",
  "/pages/home.html",
  "/pages/bigFamily.html",
  "/pages/bridegroom.html",
  "/pages/guestBook.html",
  "/pages/theParty.html",
  "https://code.jquery.com/jquery-3.4.1.min.js",
  "https://use.fontawesome.com/releases/v5.7.2/css/all.css",
  "https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-solid-900.woff2",
  "https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-solid-900.woff",
  "https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-solid-900.ttf",
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.168911386138!2d107.82267831381685!3d-6.9893759949509064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c5c5a70ba5d1%3A0x2a85e394d9b2a813!2sOniba%20Center!5e0!3m2!1sid!2sid!4v1574341445377!5m2!1sid!2sid"
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