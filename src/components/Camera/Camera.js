import React, { useState, useRef } from 'react';
import './camera.css'; // Ensure this path is correct

const Camera = ({ onCapture }) => {
    const [error, setError] = useState('');
    const [cameraOn, setCameraOn] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        setError('');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play().catch((playbackError) => {
                    console.error("Error occurred during video playback: ", playbackError);
                    setError(`Playback error: ${playbackError.message}`);
                });
            }
        } catch (accessError) {
            console.error("Error accessing the camera: ", accessError);
            setError(`Camera access error: ${accessError.message}`);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            console.log("Camera feed stopped.");
        }
    };

    const handleSwitchChange = () => {
        setCameraOn(!cameraOn);
        if (!cameraOn) {
            startCamera();
        } else {
            stopCamera();
        }
    };

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/png');
            onCapture(dataURL);
            stopCamera();
        }
    };

    return (
        <div className="camera-container">
            {cameraOn && (
                <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <div className="buttons-container">
                <label className="switch">
                    <input type="checkbox" checked={cameraOn} onChange={handleSwitchChange} />
                    <span className="slider round"></span>
                </label>
                {cameraOn && (
                    <button onClick={captureImage} className="camera-button">Capture Image</button>
                )}
            </div>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Camera;
