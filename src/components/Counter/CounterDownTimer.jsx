import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const initialTimeInSeconds = localStorage.getItem('countdownTime') || 30 * 60;
    const [timeInSeconds, setTimeInSeconds] = useState(parseInt(initialTimeInSeconds)); 

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setTimeInSeconds(prevTime => {
                const newTime = prevTime - 1;
                localStorage.setItem('countdownTime', newTime.toString());
                return newTime;
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, []); 

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <span>{formattedTime}</span>
    );
};

export default CountdownTimer;
