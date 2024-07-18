import React, { useState, useRef, useEffect } from 'react';
import './camera.css'; // Ensure this path is correct

const Camera = ({ onCapture }) => {
    const [error, setError] = useState('');
    const [cameraOn, setCameraOn] = useState(true); // Camera is on by default
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Function to start the camera
    const startCamera = async () => {
        setError('');  // Clear any previous errors
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play().then(() => {
                    console.log("Camera is now playing.");
                }).catch((playbackError) => {
                    // Handle error more discreetly without setting user-facing error state
                    console.error("Error occurred during video playback: ", playbackError);
                });
            }
        } catch (accessError) {
            console.error("Error accessing the camera: ", accessError);
            setError(`Camera access error: ${accessError.message}`);
        }
    };

    useEffect(() => {
        if (cameraOn) {
            startCamera();
        }

        // Cleanup function to turn off the camera when the component unmounts
        return () => {
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
            setCameraOn(false); // Turn off the camera after capturing the image
        }
    };

    return (
        <div className="camera-container">
            {cameraOn && <video ref={videoRef} autoPlay playsInline muted className="camera-video" />}
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
            {/* Remove or conditionally render the error message based on severity or user need */}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Camera;
