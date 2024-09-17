import React, { useState } from 'react';
import Camera from './Camera/Camera';
import { recognizeDrugs } from './VisionAPI/VisionAPI';
import './CameraPage.css';

function CameraPage() {
    const [recognizedData, setRecognizedData] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCapture = async (imageData) => {
        setLoading(true);
        setError('');
        try {
            const resultString = await recognizeDrugs(imageData);
            console.log('API Result (string):', resultString); // Log the string result from the API
    
            // Parse the string to a JSON object
            const result = JSON.parse(resultString);
            console.log('Parsed Result:', result); // Log the parsed object
    
            if (result && result.drugs) { // Check if drugs is present and is an array
                setRecognizedData(result.drugs);
                console.log('Setting recognizedData:', result.drugs); // Log what is being set
            } else {
                setRecognizedData([]); // Set as an empty array if drugs is not available
                setError('No drugs data found.');
            }
        } catch (err) {
            console.error('Error capturing and recognizing drugs:', err); // Log any errors
            setError('Failed to recognize the drug(s). Please try again.');
            setRecognizedData([]); // Ensure recognizedData is always an array
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Camera onCapture={handleCapture} />
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {recognizedData.length > 0 && recognizedData.map(drug => (
                <div key={drug.name} className={`card ${drug.addictive_or_not ? 'addictive' : 'non-addictive'}`}>
                    <h2>{drug.name}</h2>
                    <h3>{drug.addictive_or_not ? 'WARNING: Yes, this drug IS addictive' : 'No, this drug is NOT addictive'}</h3>
                    <p>{drug.summary}</p>
                </div>
            ))}
        </div>
    );
}

export default CameraPage;
