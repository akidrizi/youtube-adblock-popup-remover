const EXTENSION_VERSION = chrome.runtime.getManifest().version;
const EXTENSION_NAME = chrome.runtime.getManifest().name;
const POPUP_IDENTIFIERS = ["ytd-popup-container", "tp-yt-iron-overlay-backdrop"];

let wasRemoved = false;

/**
 * Removes all popup elements found in the document.
 *
 * @return {boolean} Whether the popup element was removed.
 */
function removePopupElements() {
    let removed = false;

    POPUP_IDENTIFIERS.forEach((identifier) => {
        const element = document.querySelector(identifier);

        if (element) {
            element.remove();
            removed = true;

            console.info(`[${identifier}] was removed.`)
        }
    });

    return removed;
}

/**
 * Promise handler for YouTube Video.
 *
 * @param video
 * @returns {Promise}
 */
function playVideo(video) {
    return new Promise((resolve, reject) => {
        video.play()
            .then(() => {
                resolve(`[${EXTENSION_NAME} ${EXTENSION_VERSION}]: Video resuming...`);
            })
            .catch(error => {
                reject(`[${EXTENSION_NAME} ${EXTENSION_VERSION}]: Error occurred while playing the video: ${error}`);
            });
    });
}

/**
 * Resumes the playback of the current video.
 */
function resumeVideo() {
    const video = document.querySelector("video.html5-main-video");
    if (!video || video.currentTime <= 0)
        return;

    playVideo(video)
        .then(message => {
            console.info(message);
        })
        .catch(error => {
            console.error(error);
        });
}

/**
 * Removes popup elements and resumes video playback.
 * Stops execution once the popup is removed.
 */
const observerCallback = () => {
    removePopupElements();
    resumeVideo();
};

// Initializes an MutationObserver to execute the observerCallback.
const observer = new MutationObserver(observerCallback);

// Setup observer on the DOM
if (window.location.hostname === "www.youtube.com") {
    observer.observe(document.body, {childList: true, subtree: true});
}
