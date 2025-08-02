// ==UserScript==
// @name         YouTube Highest Quality on Fullscreen
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Set YouTube video to highest available resolution when entering fullscreen (e.g. 4K, 1440p, 1080p, etc.)
// @author       Rehan Ahmad
// @match        https://www.youtube.com/*
// @icon         https://raw.githubusercontent.com/r280822a/YouTube-Highest-Quality-Fullscreen/refs/heads/main/icon/icon.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function showToast(message) {
        let toast = document.querySelector('tp-yt-paper-toast#fullscreen-quality-toast');
        if (toast) { // Delete if still visible to avoid unnecessary queueing
            toast.remove();
        }

        toast = document.createElement('tp-yt-paper-toast');
        toast.id = 'fullscreen-quality-toast'
        toast.innerText = message;
        document.body.appendChild(toast);

        toast.show();
    }

    function setHighestQuality() {
        const player = document.getElementById('movie_player');
        if (!player) return;

        const qualityLevels = player.getAvailableQualityLevels?.();
        const currentQuality = player.getPlaybackQuality?.();
        // console.log('All quality levels:', qualityLevels);
        // console.log('Current quality:', currentQuality);
        if (!qualityLevels || qualityLevels.length === 0) {
            console.warn('No available quality levels found.');
            return;
        }

        const highest = qualityLevels[0]; // YouTube lists highest quality first
        if (currentQuality != highest) {
            player.setPlaybackQualityRange?.(highest);
            player.setPlaybackQuality?.(highest);
            console.log('Quality set to highest available after entering fullscreen:', highest);
            showToast('Quality set to ' + highest);
        }
    }

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            setTimeout(setHighestQuality, 500);
        }
    });

    // If already fullscreen on load
    window.addEventListener('load', () => {
        if (document.fullscreenElement) {
            setTimeout(setHighestQuality, 1000);
        }
    });
})();
