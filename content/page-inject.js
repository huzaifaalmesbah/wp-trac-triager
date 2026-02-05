// This script runs in the PAGE context (not content script context)
// It can access wpTracContributorLabels and passes data to the content script

(function() {

  // Wait for wpTracContributorLabels to be available
  function waitAndExtract() {
    if (typeof wpTracContributorLabels !== 'undefined') {

      // Send data to content script via custom DOM attribute
      const dataElement = document.createElement('div');
      dataElement.id = 'wpt-contributor-data';
      dataElement.setAttribute('data-contributors', JSON.stringify(wpTracContributorLabels));
      dataElement.style.display = 'none';
      document.documentElement.appendChild(dataElement);

      // Dispatch custom event
      document.dispatchEvent(new CustomEvent('wpt-data-ready'));
    } else {
      setTimeout(waitAndExtract, 100);
    }
  }

  waitAndExtract();
})();
