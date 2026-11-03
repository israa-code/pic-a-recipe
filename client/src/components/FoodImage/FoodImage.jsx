import './FoodImage.css';

const FoodImage = ({imgUrl}) => {
    return(
        <div className='ma2 inv-box'>
            <img className='center-img' src={imgUrl}></img>
        </div>
    );
}

export default FoodImage;
