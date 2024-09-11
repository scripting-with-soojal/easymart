import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = () => {
    const [time, setTime] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((time) => time = time - 1)
        }, 1000);
        time === 0 &&
            navigate('/', {
                state: location.pathname
            });
        return () => {
            clearInterval(interval);
        }
    }, [time, navigate, location]);

    return (
        <>
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <h1 className="Text-center">redirecting to you in {time} second </h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner