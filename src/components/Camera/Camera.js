import React, { useState, useRef, useEffect } from 'react';
import './camera.css'; // Ensure this path is correct

const Camera = ({ onCapture }) => {
    const [error, setError] = useState('');
    const [cameraOn, setCameraOn] = useState(true); // Camera is on by default
    const [facingMode, setFacingMode] = useState("environment"); // Default to 'environment'
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Function to determine the initial facing mode based on screen size
    const determineFacingMode = () => {
        // Define a threshold for "smaller screens" like mobile phones
        const screenWidthThreshold = 768; // For example, 768px could be a threshold
        if (window.innerWidth <= screenWidthThreshold) {
            return "environment"; // Use back camera for small screens
        } else {
            return "user"; // Use front camera for larger screens
        }
    };

    // Function to start the camera
    const startCamera = async () => {
        setError('');
        const constraints = {
            video: {
                facingMode: facingMode 
            }
        };
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play().catch((playbackError) => {
                    console.error("Error occurred during video playback: ", playbackError);
                    //setError(`Playback error: ${playbackError.message}`);
                });
            }
        } catch (accessError) {
            console.error("Error accessing the camera: ", accessError);
            setError(`Camera access error: ${accessError.message}`);
        }
    };

    useEffect(() => {
        setFacingMode(determineFacingMode()); // Determine the initial facing mode

        // Listener for window resize to update facing mode if necessary
        const handleResize = () => {
            setFacingMode(determineFacingMode());
        };
        window.addEventListener('resize', handleResize);

        if (cameraOn) {
            startCamera();
        }

        // Cleanup function to turn off the camera and remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        };
    }, [cameraOn]); // Dependency array includes cameraOn

    const captureImage = () => {
        if (cameraOn && videoRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/png');
            onCapture(dataURL);
            setCameraOn(false);
        }
    };

    return (
        <div className="camera-container">
            {cameraOn && (
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="camera-video"
                    style={{transform: facingMode === 'user' ? 'scaleX(-1)' : 'none'}}
                />
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <div className="buttons-container">
                {!cameraOn && (
                    <button onClick={() => window.location.reload()} className="camera-button">
                        Scan Another Drug
                    </button>
                )}
                {cameraOn && (
                    <button onClick={captureImage} className="camera-button">Capture Image</button>
                )}
            </div>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Camera;
