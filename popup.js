(function () {
    document.addEventListener('DOMContentLoaded', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const url = new URL(tab.url);

        // Hide the button and error message by default
        const downloadBtn = document.getElementById('downloadBtn');
        const errorMessage = document.getElementById('errorMessage');

        // Regular YouTube video ID from query parameter (v=videoId)
        const videoIdFromQuery = url.searchParams.get('v');

        // YouTube Shorts video ID from path
        const videoIdFromShorts = url.pathname.split('/shorts/')[1];

        // Check if it's a regular YouTube video or YouTube Shorts
        if (videoIdFromQuery || videoIdFromShorts) {
            // If it's a valid YouTube video (either regular or Shorts), show the download button
            downloadBtn.style.display = 'block';
            errorMessage.style.display = 'none';
        } else {
            // Show the error message if not a YouTube video or Shorts page
            downloadBtn.style.display = 'none';
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Oops! It looks like you are not on a YouTube video page! Please open a YouTube video to download the thumbnail.';
        }
    });

    document.getElementById('downloadBtn').addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const url = new URL(tab.url);

        // Regular YouTube video ID from query parameter (v=videoId)
        const videoIdFromQuery = url.searchParams.get('v');

        // YouTube Shorts video ID from path
        const videoIdFromShorts = url.pathname.split('/shorts/')[1];

        // Determine the videoId to use
        const videoId = videoIdFromQuery || videoIdFromShorts;

        if (videoId) {
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            chrome.downloads.download({ url: thumbnailUrl, filename: `${videoId}.jpg` });
        } else {
            // This case should not occur, as the button is hidden for invalid URLs
            alert('Unexpected error: No video ID found.');
        }
    });
}());
