import { useState, useEffect } from 'react';
import './ImageLink.css'    
const API_URL = import.meta.env.VITE_API_URL;

const ImageLink = ({setImgUrl, setDataIng, dataIngredient}) => { 
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); 
    //state changes       
    useEffect(() => {
        console.log('dataIngredient updated: ', dataIngredient);
    }, [dataIngredient]);

    //The backend handles the request to Gemini and returns the detected ingredients so the API key is secure. 
    const onButtonSubmit = async () => { 
        if (!file) {
            setErrorMessage('Please select an image first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${API_URL}/api/gemini`, {
            method: 'POST',
            /* No Content-Type header: the browser sets multipart/form-data
               with the correct boundary when the body is FormData. */
            body: formData,
            });

            if (!response.ok) {
                const body = await response.json();
                throw new Error(body.error || `Request failed with status ${response.status}`);
            }

            const list = await response.json();
            setDataIng([...dataIngredient, ...list.ingredients]);

        } catch (error) {
            setErrorMessage(error.message || 'An error occurred while detecting ingredients.');
            console.error('Error calling Gemini:', error);
        }
    }

    const handleImageData = (event) => {
        const selected = event.target.files[0];
        if (!selected) return; // user cancelled the picker
        
        setFile(selected);
        setImgUrl(URL.createObjectURL(selected)); 
    }
    return (
        <div>
            <p className='f4 black mt2'>
                This will detect ingredients in your picture. Give it a try.
            </p>
            <div className='center flex flex-column'> 
                <div className='center pa3 br3 shadow-5 box'>
                    <input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" onChange={handleImageData} />
                    <button type="button" onClick={onButtonSubmit}  className='w-20 grow f5 link ph2 pv1 white br1 bg-green b--dark-green'>Detect</button>
                </div>
            </div>
            {errorMessage && <p className='error-message'>{errorMessage}
                                <button 
                                type="button" 
                                aria-label="Delete error message" 
                                className='error-dismiss-btn' 
                                onClick={() => setErrorMessage('')}>✖</button>
                             </p>}  
        </div>
    );
}

export default ImageLink;