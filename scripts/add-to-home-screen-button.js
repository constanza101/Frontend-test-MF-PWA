const btnAdd = document.getElementById('btnAdd');

let deferredPrompt;
//(1: listen beforeinstallprompt)
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt:
  e.preventDefault();
  // Stash the event so it can be triggered later:
  deferredPrompt = e;
  // Update UI to (2:) notify the user they can add to home screen:
  console.log("asdasdadasdsadsadadsadsdadsdsadsad"+deferredPrompt);
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
