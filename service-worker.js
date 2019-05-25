
self.addEventListener('install', function(event) {
 event.waitUntil(
   caches.open('github-users').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/styles/index.css',
       '/index.js',
     ]);
   })
 );
});


this.addEventListener('fetch', function (event) {
    // it can be empty if you just want to get rid of that error
});
