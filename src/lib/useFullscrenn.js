import React, { useRef, useState } from "react";

const useFullscreen = (callback) => {
    const element = useRef();

    const [fullState, setState] = useState(false);

    const runCb = (isFull) => {
        if (callback && typeof callback === "function") {
            callback(isFull);
        }
    };
    const triggerFull = () => {
        if (!fullState) {
            if (element.current) {
                if (element.current.requestFullscreen) {
                    element.current.requestFullscreen();
                } else if (element.current.mozRequestFullScreen) {
                    element.current.mozRequestFullScreen();
                } else if (element.current.webkitRequestFullscreen) {
                    element.current.webkitRequestFullscreen();
                } else if (element.current.msRequestFullscreen) {
                    element.current.msRequestFullscreen();
                }
                setState(true)
                runCb(true);
            }
        } else {
            return
        }
    };

    const exitFull = () => {
        if (fullState) {
            document.exitFullscreen();
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setState(false)
            runCb(false);
        } else {
            return
        }
    };
    return { element, triggerFull, exitFull };
};

export default useFullscreen;