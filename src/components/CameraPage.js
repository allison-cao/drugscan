import React, { useState } from 'react';
import Camera from './Camera/Camera';
import { recognizeDrugs } from './VisionAPI/VisionAPI';

function CameraPage() {
    const [recognizedData, setRecognizedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCapture = async (imageData) => {
        setLoading(true);
        setError('');
        try {
            const result = await recognizeDrugs(imageData);
            setRecognizedData(result);
        } catch (err) {
            setError('Failed to recognize the drug(s). Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Camera onCapture={handleCapture} />
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {recognizedData && (
                <div className="result">
                    <h2>Recognized Drugs:</h2>
                    <p>{recognizedData}</p>
                </div>
            )}
        </div>
    );
}

export default CameraPage;