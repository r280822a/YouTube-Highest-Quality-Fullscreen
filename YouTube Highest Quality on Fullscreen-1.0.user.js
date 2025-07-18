// ==UserScript==
// @name         YouTube Highest Quality on Fullscreen
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Set YouTube video to highest available resolution when entering fullscreen (e.g. 4K, 1440p, 1080p, etc.)
// @author       Rehan Ahmad
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function setHighestResolution() {
        const player = document.getElementById('movie_player');
        if (!player) return;

        const qualities = player.getAvailableQualityLevels?.();
        if (!qualities || qualities.length === 0) {
            console.warn('No available resolutions found.');
            return;
        }

        const highest = qualities[0]; // YouTube lists highest resolution first
        console.log('Setting resolution to highest available:', highest);
        player.setPlaybackQualityRange?.(highest);
        player.setPlaybackQuality?.(highest);
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
