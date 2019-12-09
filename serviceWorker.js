const CACHE_NAME = 'submission-2 v0.2'
const urlToCache = [
    '/',
    './index.html',
    './manifest.json',
    './serviceWorker.js',
    './page/fav-team.html',
    './page/home.html',
    './page/match.html',
    './page/team.html',
    './assets/shell/nav-shell.html',
    './assets/css/materialize.css',
    './assets/css/style.css',
    './assets/images/jonathan-j-castellon-c-73a3gO5d8-unsplash.jpg',
    './assets/images/user/griffonbase.gfl___B4X25y0BcQS___.jpg',
    './assets/images/app/arrow-left-solid.svg',
    './assets/images/icons/icon-128x128.png',
    './assets/images/icons/icon-144x144.png',
    './assets/images/icons/icon-152x152.png',
    './assets/images/icons/icon-192x192.png',
    './assets/images/icons/icon-384x384.png',
    './assets/images/icons/icon-512x512.png',
    './assets/images/icons/icon-72x72.png',
    './assets/images/icons/icon-96x96.png',
    './assets/js/api.js',
    './assets/js/DB.js',
    './assets/js/functions.js',
    './assets/js/idb.js',
    './assets/js/init.js',
    './assets/js/materialize.js',
    './assets/js/script.js'
]
const base_url = 'https://api.football-data.org/v2'
const base_url2 = 'https://upload.wikimedia.org/wikipedia'

// * install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlToCache)
        })
    )
})

// * fetch
self.addEventListener('fetch', event => {
    if (event.request.url.indexOf(base_url) > -1 || event.request.url.indexOf(base_url2) > -1) {
        event.respondWith(
            (async () => {
                const cache = await caches.open(CACHE_NAME)
                const res = await fetch(event.request)
                cache.put(event.request.url, res.clone())
                return res
            })()
        )
    } else {
        event.respondWith(
            (async () => {
                return await caches.match(event.request.url, {
                    ignoreSearch: true
                }) || await fetch(event.request)
            })()
        )
    }
})

// *delete
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('cache '+cacheName+' dihapus')
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

// * push notification
self.addEventListener('push', event => {
    console.log(event);
    let body;
    if (event.data) {
        body = event.data.text()
    }else{
        body = "push message no payload"
    }

    let opt ={
        body,
        icon : './assets/images/icons/icon-512x512.png',
        vibrate : [100,50,100],
        data : {
            dateOfArrival : Date.now(),
            primaryKey : 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Push notification',opt)
    )
})