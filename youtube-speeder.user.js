// ==UserScript==
// @name         Youtube Speeder
// @namespace    https://github.com/muratcesmecioglu/youtube-speeder
// @version      0.1
// @description  Adds button to speed up below youtube video.
// @author       Murat Çeşmecioğlu
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant         unsafeWindow
// @run-at       document-end
// ==/UserScript==
(function() {
    'use strict';

    document.addEventListener('yt-navigate-finish', () => {
        setTimeout(() => {
            const buttonsContainer = document.getElementById("player");
            const speedinfo = document.createElement("span");
            speedinfo.textContent = "1.00";
            speedinfo.id = "videoSpeedDisplay";
            buttonsContainer.appendChild(speedinfo);

            let videoSpeed = 1.0;
            const videoSpeedDisplay = document.getElementById("videoSpeedDisplay");


            function changeSpeedWithAnimation(targetSpeed) {
                const initialSpeed = videoSpeed;
                const duration = 1000;
                const steps = 60;

                function easeOutQuad(t) {
                    return t * (2 - t);
                }

                function animate(time) {
                    const elapsedTime = time - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const easedProgress = easeOutQuad(progress);
                    videoSpeed = initialSpeed + (targetSpeed - initialSpeed) * easedProgress;
                    document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = videoSpeed.toFixed(2);
                    videoSpeedDisplay.textContent = videoSpeed.toFixed(2);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                }

                const startTime = performance.now();
                animate(startTime);
            }

            function createButton(text, speed) {
                const button = document.createElement("button");
                button.textContent = text;
                button.addEventListener("mousedown", function() {
                    changeSpeedWithAnimation(speed);
                });
                button.addEventListener("mouseup", function() {
                    changeSpeedWithAnimation(1);
                });
                buttonsContainer.appendChild(button);
            }

            createButton("1.5x", 1.5);
            createButton("2x", 2);
            createButton("5x", 5);
            createButton("10x", 10);
            createButton("Reset", 1);

        }, 1000);
    });

})();
