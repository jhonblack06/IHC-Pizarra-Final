import React, { useEffect } from 'react';
import ScriptTag from 'react-script-tag';
import tracking from './tracking.js';
import drawSpline from './splines.min.js';
import './stats.min.js';
import './demo.css'

function Board(props) {
    //const [user, setUser] = React.useState('');

    useEffect(() => {
        start();
        /*const script1 = document.createElement('script');
        script1.src = "./tracking.js";
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = "./splines.min.js";
        script2.async = true;
        document.body.appendChild(script2);

        const script3 = document.createElement('script');
        script3.src = "./stats.min.js";
        script3.async = true;
        document.body.appendChild(script3);

        const script4 = document.createElement('script');
        script4.src = "./load.js";
        script4.async = true;
        document.body.appendChild(script4);*/

    }, []);

    const start = () => {
        var video = document.getElementById('video');
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        var drawSegments = [[]];
        var segment = 0;

        tracking.ColorTracker.registerColor('red', function(r, g, b) {
            var threshold = 100,
                dx = r - 255,
                dy = g - 0,
                dz = b - 0;

            if ((r - g) >= threshold && (r - b) >= threshold) {
                return true;
            }
            return dx * dx + dy * dy + dz * dz < 10600;
        });

        tracking.ColorTracker.registerColor('ired', function(r, g, b) {
            var th = 40;
            var dx = r - 255;
            var dy = g - 73;
            var dz = b - 183;

            if ((r - g) >= th && (r - b) >= th) {
                return true;
            }
            return dx * dx + dy * dy + dz * dz < 10600;
        });
        tracking.ColorTracker.registerColor ('blue', function(r, g, b) {
            var threshold = 50,
                dx = r - 0,
                dy = g - 0,
                dz = b - 255;

            if ((b - g) >= threshold && (b - r) >= threshold) {
                return true;
            }
            return false;
        });
        var tracker = new tracking.ColorTracker(['blue']);

        tracking.track('#video', tracker, { camera: true });


        tracker.on('track', function(event) {
            if (event.data.length === 0 && drawSegments[segment].length > 0) {
                segment++;

                if (!drawSegments[segment]) {
                    drawSegments[segment] = [];
                }
            }

            event.data.forEach(function(rect) {
                if (rect.color === 'red') {
                    draw(rect);
                }
                else if (rect.color === 'blue') {
                    draw(rect);
                }
            });
        });

        function draw(rect) {
            drawSegments[segment].push(rect.x + rect.width / 2, rect.y + rect.height / 2);
        }

        function isInsideRect(x, y, rect) {
            return rect.x <= x && x <= rect.x + rect.width &&
                rect.y <= y && y <= rect.y + rect.height;
        }

        (function loop() {
            for (var i = 0, len = drawSegments.length; i < len; i++) {
                drawSpline(context, drawSegments[i], 1.0, false,false,"#00ffff",5);
            }

            drawSegments = [drawSegments[drawSegments.length - 1]];
            segment = 0;

            requestAnimationFrame(loop);
        }());
    }

    return(
        <>
            <div className="draw-frame">
                <video id="video" width="800" height="600" preload autoPlay loop muted></video>
                <canvas id="canvas" width="800" height="600"></canvas>
            </div>
        </>
    );
}

export default Board;