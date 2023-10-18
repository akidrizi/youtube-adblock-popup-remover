/**
 * Removes ad elements when found.
 */
function removeAdElements() {
  const overlayElement = document.querySelector('tp-yt-iron-overlay-backdrop.opened');
  if (overlayElement) {
    overlayElement.remove();
  }

  const popupElement = document.querySelector('tp-yt-paper-dialog.style-scope.ytd-popup-container');
  if (popupElement) {
    popupElement.remove();
  }
}

/**
 * When current DOM is loaded and the host
 */
window.addEventListener('load', (event) => {
  if (window.location.hostname === 'www.youtube.com' || 'youtube.com') {
    removeAdElements();
  }
});