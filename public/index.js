window.addEventListener('load', async () => {

  // Service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }

  // Reference(s)
  const messageRef = document.getElementById('status');

  // Utility function(s)
  function appendStatus(code) {
    switch (code) {

      case 200:
        messageRef.innerText = "200: OK";
        break;

      case 429:
        messageRef.innerText = "429: Too Many Requests";
        break;

      default:
        messageRef.innerText = "501: Internal Server Error";
        break;

    }
  }

  // Endpoint(s)
  await fetch("/rate", { method: "GET" })
    .then(res => appendStatus(res.status))
    .catch(err => {

      // console.log(String(err.message));
      if (String(err.message) === 'Failed to fetch')
        document.body.innerHTML = `<div class='offline'>
                                      <h2>You're offline!<h2>
                                      <h4> Please check your network and try again </h4>
                                   </div>`;
    });

  // Rendering status
  console.log('Initial load successful in ' +
    document.timeline.currentTime + ' ms');

});
