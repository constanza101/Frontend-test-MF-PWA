
self.addEventListener('install', function(event) {
 event.waitUntil(
   caches.open('github-users').then(function(cache) {
     return cache.addAll([
       '/index.html',
       '/styles/index.css',
       '/index.js',
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
        })
    );
});
