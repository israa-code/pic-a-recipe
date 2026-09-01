import { useState, useEffect } from 'react';
import './ImageLink.css'

const ImageLink = ({setImgUrl, imgUrl, setDataIng, dataIngredient}) => { 
    const API_URL = import.meta.env.VITE_API_URL;
    //state changes       
    useEffect(() => {
        console.log('imgUrl updated: ', imgUrl);
    }, [imgUrl]);
    useEffect(() => {
        console.log('dataIngredient updated: ', dataIngredient);
    }, [dataIngredient]);

    //fetch data ingredients through backend server
    const onButtonSubmit = () => {  
        const handleClarifaiRequest = async (imgUrl) => {
        try {
            const response = await fetch(`${API_URL}/clarifai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl: imgUrl })
            });
            const data = await response.json();
            console.log('Clarifai API Response:', data);
            //filter ing that has an accuracy value > 0.02 and setDataIng 
            setDataIng([...dataIngredient, ...data.outputs[0].data.concepts.filter(ing => ing.value > 0.02).map(ing => ing.name)]);
        } catch (error) {
            console.error('Error calling Clarifai API:', error);
        }
        };
        handleClarifaiRequest(imgUrl);
    }
    //set img url value 
    const handleImgUrl = (event) => {
        setImgUrl(event.target.value);
    }
    return (
        <div>
            <p className='f4 black mt2'>
                {'This will detect ingredients in your picture. Give it a try.'}
            </p>
            <div className='center'> 
                <div className='center pa3 br3 shadow-5 box'>
                    <input onInput={handleImgUrl} type='text' placeholder='URL' className='f5 pa1 w-80 ' />
                    <button onClick={onButtonSubmit}  className='w-20 grow f5 link ph2 pv1 white br1 bg-green b--dark-green'>Detect</button>
                </div>   
            </div>
        </div>
    );
}

export default ImageLink;