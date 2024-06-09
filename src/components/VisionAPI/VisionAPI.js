import axios from 'axios';

export const recognizeDrugs = async (imageData) => {
    try {
        const response = await axios.post('/api/recognize-drugs', { imageData });
        return response.data.message;
    } catch (error) {
        console.error('Error recognizing drugs:', error);
        throw error;
    }
};
