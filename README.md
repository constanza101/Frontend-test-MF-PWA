**Index**
  * **Service Worker**
  * **Styles**
      * Avoid zoom-in on input focus (safari mobile).
  * **Icons for iOS (Web Clip)**


**Service worker**
--
[source](https://codelabs.developers.google.com/codelabs/offline/#0)
*  **Where to find, try offline and uninstall the Service Worker**
  * DevTools > Application > Service Workers
    * offline checkbox to check offline behavior.
    * click on Unregister link to uninstall service worker.


* **Register a service worker on the site (for offline support)**

   * **This consists of two steps:**


1. Create a JavaScript file that will be the service worker.
    * *NOTE: The location of the service worker is important! For security reasons, a service worker can only control the pages that are in its same directory or its subdirectories. This means that if you place the service worker file in a scripts directory it will only be able to interact with pages in the scripts directory or below.*


2. Tell the browser to register the JavaScript file as the "service worker": open index.html and add the following code to the bottom of `<body>`
      * *The script checks if the browser supports service workers. If it does, then it registers our server-worker.js file as the service worker, and then logs to the Console.*

```javascript
<script>
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/service-worker.js')
           .then(function() { console.log("Service Worker Registered"); });
}
</script>
```

If we now open the app in the browser, we should see the serviceWorker installed at:
 DevTools > Application > Service Workers > source: service-worker.js

* **Install the site assets (write the service-worker-js):**

With the service worker registered, the first time a user hits the page an install event is triggered. This event is where you want to cache your page assets.

```javascript

self.addEventListener('install', function(event) {
//  The install event listener opens the caches object and then populates it with the list of resources that we want to cache
 event.waitUntil(
   caches.open('myAppName').then(function(cache) {
     return cache.addAll([
       //One important thing about the addAll operation is that it's all or nothing. If one of the files is not present or fails to be fetched, the entire addAll operation fails. A good application will handle this scenario.
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/styles/main.css',
       '/scripts/main.min.js',
     ]);
   })
 );
});
```

* **Intercept the web page
 requests**

*(One powerful feature of service workers is that it can intercept every request that the page makes and decide what to do with the request.)*

  Make service worker intercept requests and return the cached versions of assets, rather than going to the network to retrieve them.


1. The first step is to attach an event handler to the fetch event. This event is triggered for every request that is made (do not copy this yet, as we will need to add something else later).


```javascript
self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
});
```

2. To make your application work offline you need to pull the requests from the cache, if it is available.
 Update your fetch event listener to match the code below:




``` JavaScript
  self.addEventListener('fetch', function(event) {
      console.log(event.request.url);
      event.respondWith(
          caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
          })
      );
  });
  ```


  `event.respondWith()` method tells the browser to evaluate the result of the event in the future.

   `caches.match(event.request)` takes the current web request that triggered the fetch event and looks in the cache for a resource that matches. The match is performed by looking at the URL string. The `match` method returns a promise that resolves even if the file is not found in the cache. This means that you get a choice about what you do. In your simple case, when the file is not found, you simply want to fetch it from the network and return it to the browser.

(This is the simplest case; there are many other caching scenarios. For example, you could incrementally cache all responses for previously uncached requests, so in the future they are all returned from the cache.)












**Styles**
--
* **Avoid zoom-in on input focus (safari mobile):**
Set the font size of your inputs to at least 16px. [source](https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone)

      @media screen and (-webkit-min-device-pixel-ratio:0) {
        select,
        textarea,
        input, button {
          font-size: 16px;
        }
      }


**Icons for iOS (Web Clip)**
--
[Font](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)









**Fonts and interesting articles**
--
* [9 amazing PWA secrets](https://www.creativebloq.com/features/9-amazing-pwa-secrets)
* [Designing Native-Like Progressive Web Apps For iOS](https://medium.com/appscope/designing-native-like-progressive-web-apps-for-ios-1b3cdda1d0e8)
* [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk/related) - desktop web app to test PWAs efficiency
