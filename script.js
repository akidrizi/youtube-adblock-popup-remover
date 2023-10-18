const POPUP_IDENTIFIERS = ["ytd-popup-container", "tp-yt-iron-overlay-backdrop"];

let wasRemoved = false;

/**
 * Removes all popup elements found in the document.
 *
 * @return {boolean} Returns true if any popup element was removed, otherwise false.
 */
function removePopupElements() {
  let removed = false;

  POPUP_IDENTIFIERS.forEach((identifier) => {
    const element = document.querySelector(identifier);

    if (element) {
      element.remove();
      removed = true;
    }
  });

  return removed;
}

/**
 * Resumes the playback of the current video.
 */
function resumeVideo() {
  const video = document.querySelector("video.html5-main-video");
  if (video && video.paused && video.currentTime > 0.0) {
    video.play();
  }
}

/**
 * Initializes a MutationObserver to monitor changes in the DOM.
 *
 * Removes popup elements and resumes video playback.
 * Stops execution once the popup is removed.
 */
const observerCallback = () => {
  if (wasRemoved) return;

  wasRemoved = removePopupElements();
  resumeVideo();
};

const observer = new MutationObserver(observerCallback);

// Setup observer on the DOM
if (window.location.hostname === "www.youtube.com") {
  observer.observe(document.body, { childList: true, subtree: true });
}
