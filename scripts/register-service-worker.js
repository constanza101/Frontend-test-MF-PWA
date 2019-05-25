/*
checks if the browser supports service workers.
If it does, then it registers our service-worker.js
as the service worker, and then logs to the Console
  */
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('./service-worker.js')
           .then(function() { console.log("Service Worker Registered"); });
}
