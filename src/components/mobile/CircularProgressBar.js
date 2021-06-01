import React, { useState } from 'react';
import styled from 'styled-components';

const CircularProgressCompo = styled.div`
    .circle-background,
    .circle-progress {
        fill: none;
    }

    .circle-background {
        stroke: #7C7C7C;
    }

    .circle-progress {
        stroke: #CE3F3F;
        stroke-linecap: unset;
        stroke-linejoin: round;
    }

    .circle-text {
        font-family: NotoSansKR-Regular;
        font-size: 23px;
        font-weight: 100;
        fill: #fff;
    }

`;

const CircularProgressBar = ({ sqSize, strokeWidth, percentage }) => {

    const [state, setState] = useState({});

    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percentage / 100;

    return (
        <CircularProgressCompo>
            <svg
                width={sqSize}
                height={sqSize}
                viewBox={viewBox}>
                <circle
                    className="circle-background"
                    cx={sqSize / 2}
                    cy={sqSize / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`} />
                <circle
                    className="circle-progress"
                    cx={sqSize / 2}
                    cy={sqSize / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    // Start progress marker at 12 O'Clock
                    transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }} />
                <text
                    className="circle-text"
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle">
                    {`${percentage}%`}
                </text>
            </svg>
        </CircularProgressCompo>
    );
};

export default CircularProgressBar;

CircularProgressBar.defaultProps = {
    sqSize: 100,
    percentage: 30,
    strokeWidth: 8
};

//참고:: https://codepen.io/juhaelee/pen/GxymWP