// ==UserScript==
// @name         YouTube 4K on Fullscreen
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Set YouTube resolution to 4K (2160p) when entering fullscreen
// @author       Rehan Ahmad
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function setResolutionTo4K() {
        const player = document.getElementById('movie_player');
        if (!player) return;

        const qualities = player.getAvailableQualityLevels?.();
        if (!qualities || !qualities.includes('hd2160')) {
            console.warn('4K not available. Available qualities:', qualities);
            return;
        }

        console.log('Setting to 4K');
        player.setPlaybackQualityRange?.('hd2160');
        player.setPlaybackQuality?.('hd2160');
    }

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            setTimeout(setResolutionTo4K, 500);
        }
    });

    // If already fullscreen on load
    window.addEventListener('load', () => {
        if (document.fullscreenElement) {
            setTimeout(setResolutionTo4K, 1000);
        }
    });
})();
