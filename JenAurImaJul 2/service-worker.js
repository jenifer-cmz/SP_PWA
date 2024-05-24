// ***********************************************************
//                      CODED BY                             *
//                  TEAM JEN.AUR.IMA.JUL                     *
//       AKA : JENIFER - AURÉLIE - IMADE - JULIEN            *
//    LPDWCA 23-24 - U.E 6.3 - PROGRESSIVE WEB APPLICATION   *
// ***********************************************************



const CACHE_NAME = 'whatsapp-clone-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/appicon.png',
    '/appicon.png',    
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('install', event => {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
});

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);

});

self.addEventListener('push', event => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: './appicon.png',
        badge: './badge.png'
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

