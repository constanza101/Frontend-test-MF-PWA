This is a mobile version of the app developed [here](https://github.com/constanza101/Frontend-test-MF) which can be used as a mobile app thanks to some innovative techniques which let us emulate a native app, which does not need to be downloaded from any app store.

There are as well some changes in the javascript methods such as making HTTP resquests by "fetch" and using promises, instead of "AJAX" with callbacks.
* [Most popular ways to make an HTTP request in JavaScript](https://www.freecodecamp.org/news/here-is-the-most-popular-ways-to-make-an-http-request-in-javascript-954ce8c95aaa/)

**Index**
  * [**Service Worker**](https://github.com/constanza101/Frontend-test-MF-PWA#service-worker)
  * [**Styles**](https://github.com/constanza101/Frontend-test-MF-PWA#styles)
      * Avoid zoom-in on input focus (safari mobile).
  * [**Icons for iOS (Web Clip)**](https://github.com/constanza101/Frontend-test-MF-PWA#icons-for-ios-web-clip)
  * [**Splash screens for iOS mobile devices**](https://github.com/constanza101/Frontend-test-MF-PWA#splash-screens-for-ios)
  * [**Add to Home Screen**](https://github.com/constanza101/Frontend-test-MF-PWA#add-to-home-screen)


**Service worker**
--
[Source](https://codelabs.developers.google.com/codelabs/offline/#0)
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

* **Link styling (no decorators)**

      a, a:link, a:visited, a:hover, a:active  {
        color: black;
        text-decoration: none;
      }



**Icons for iOS (Web Clip)**
--
How to add web clip icons for iOs devices? They {still? - will they ever?} do not read the icons in the manifest.json, so we have add them to the `<head>` of index.html, example:

```
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="180x180" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="167x167" href="touch-icon-ipad-retina.png">
```
* [Source](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
* [Icons generator (npm package)](https://www.npmjs.com/package/pwa-icon-generator)
* [Icons generator too onlne](http://cthedot.de/icongen/)

**Splash screens for iOs**
--
Do not forget that in order to have a custom launch screen, your app needs to be mobile web app capable, which can be accomplished with the following meta tag.

`<meta name="apple-mobile-web-app-capable" content="yes">`


And add the following links to the `<head>`:

```
<!-- iPhone X (1125px x 2436px) -->
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="/apple-launch-1125x2436.png">

<!-- iPhone 8, 7, 6s, 6 (750px x 1334px) -->
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-750x1334.png">

<!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) -->
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="/apple-launch-1242x2208.png">

<!-- iPhone 5 (640px x 1136px) -->
<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-640x1136.png">

<!-- iPad Mini, Air (1536px x 2048px) -->
<link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-1536x2048.png">

<!-- iPad Pro 10.5" (1668px x 2224px) -->
<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-1668x2224.png">

<!-- iPad Pro 12.9" (2048px x 2732px) -->
<link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-2048x2732.png">
```     

* [Source](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
* [Splash screens generator](https://appsco.pe/developer/splash-screens)

**Add to Home Screen**
--
[Source](https://developers.google.com/web/fundamentals/app-install-banners/#criteria)

"Add to Home Screen", sometimes referred to as the web app install prompt, makes it easy for users to install your Progressive Web App on their mobile or desktop device. After the user accepts the prompt, your PWA will be added to their launcher, and it will run like any other installed app.

* **Chrome:**
--
The "add to home screen" feature is not yet very much known among mobile users, so most people will not know that they can add your app to their homescreen to be able to use it the way they use natve apps. We can help them do this, adding a "add to home screen button".

  * **On mobile**, Chrome will generate a [WebAPK (android)](https://developers.google.com/web/fundamentals/integration/webapks), creating an even more integrated experience for your users.
  * **On desktop**, your app will installed, and run in an [app window](https://developers.google.com/web/progressive-web-apps/desktop#app-window).


* **Required manifest properties**

To prompt the user to install your **native app**, you need to add two properties to your web app **manifest**:

 `prefer_related_applications` (set to true for native apps) and
 `related_applications`:

```
"prefer_related_applications": false,
"related_applications": [
  {
    "platform": "play",
    "id": "com.google.samples.apps.iosched"
  }
]
```
* **How does this work?**
    * The `prefer_related_applications` property tells the browser to prompt the user with your native app instead of the web app.

    **Leaving this value unset, or false, the browser will prompt the user to install the web app instead.**

    * `related_applications` is an array with the location info of yout **native** app (see more in the [source](https://developers.google.com/web/fundamentals/app-install-banners/native#prefer_related))


* **Show the install prompt:**

  1. Listen for the beforeinstallprompt event.
  2. Notify the user your native app can be installed with a button or other element that will generate a user gesture event.
  3. Show the prompt by calling prompt() on the saved beforeinstallprompt event.


```javascript

let deferredPrompt;
//(1: listen beforeinstallprompt)
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt:
  e.preventDefault();
  // Stash the event so it can be triggered later:
  deferredPrompt = e;
  // Update UI to (2:) notify the user they can add to home screen:
  btnAdd.style.display = 'block';
});

//(3) Show the prompt by calling prompt() on the saved beforeinstallprompt event.
btnAdd.addEventListener('click', (e) => {
  // hide our user interface that shows our "add to home screen" (A2HS) button:
  btnAdd.style.display = 'none';
  // Show the prompt:
  deferredPrompt.prompt();
  // Wait for the user to respond to the promp:t
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});
```


**Fonts and interesting articles**
--
* [9 amazing PWA secrets](https://www.creativebloq.com/features/9-amazing-pwa-secrets)
* [Designing Native-Like Progressive Web Apps For iOS](https://medium.com/appscope/designing-native-like-progressive-web-apps-for-ios-1b3cdda1d0e8)
* [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk/related) - desktop web app to test PWAs efficiency
