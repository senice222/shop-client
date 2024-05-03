import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [timeInSeconds, setTimeInSeconds] = useState(30 * 60); 

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setTimeInSeconds(prevTime => prevTime - 1);
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