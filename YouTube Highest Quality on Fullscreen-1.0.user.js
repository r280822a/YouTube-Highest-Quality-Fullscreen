// ==UserScript==
// @name         YouTube Highest Quality on Fullscreen
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Set YouTube video to highest available resolution when entering fullscreen (e.g. 4K, 1440p, 1080p, etc.)
// @author       Rehan Ahmad
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function showToast(message) {
        let toast = document.querySelector('tp-yt-paper-toast#customtoast');
        if (toast) { // Delete if still visible to avoid unnecessary queueing
            toast.remove();
        }

        toast = document.createElement('tp-yt-paper-toast');
        toast.id = 'customtoast'
        toast.innerText = message;
        document.body.appendChild(toast);

        toast.show();
    }

    function setHighestResolution() {
        const player = document.getElementById('movie_player');
        if (!player) return;

        const qualities = player.getAvailableQualityLevels?.();
        console.log('All qualities:', qualities);
        if (!qualities || qualities.length === 0) {
            console.warn('No available resolutions found.');
            return;
        }

        const highest = qualities[0]; // YouTube lists highest resolution first
        player.setPlaybackQualityRange?.(highest);
        player.setPlaybackQuality?.(highest);
        console.log('Resolution set to:', highest);
        showToast('Resolution set to ' + highest);
    }

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            setTimeout(setHighestResolution, 500);
        }
    });

    // If already fullscreen on load
    window.addEventListener('load', () => {
        if (document.fullscreenElement) {
            setTimeout(setHighestResolution, 1000);
        }
    });
})();
