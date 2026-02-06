import ImageLink from '../../components/ImageLink/ImageLink.jsx';
import IngredientList from '../../components/IngredientList/IngredientList.jsx';
import CreateRecipeButton from '../../components/CreateRecipeButton/CreateRecipeButton.jsx';
import FoodImage from '../../components/FoodImage/FoodImage.jsx';
import './Home.css';
import {useState} from 'react';

import {Link} from 'react-router-dom';

const Home = ({dataRecipe, setDataRecipe, onLoading}) => {
    const [imgUrl, setImgUrl] = useState('');
    const [dataIngredient, setDataIng] = useState([]);

    return (
      <div className='container1'>
        <div className='container2'>
          <Link to='book'>
            <CreateRecipeButton dataRecipe={dataRecipe} setDataRecipe={setDataRecipe} dataIngredient={dataIngredient} onLoading={onLoading}/>        
          </Link>
          <ImageLink setImgUrl={setImgUrl} imgUrl={imgUrl} setDataIng={setDataIng} dataIngredient={dataIngredient}/>
        </div>
        <div className='size-shift'>
          <IngredientList dataIngredient={dataIngredient} setDataIng={setDataIng}/>
        </div>
        <FoodImage className='food-image' imgUrl={imgUrl} />
      </div>
    );
}

export default Home;