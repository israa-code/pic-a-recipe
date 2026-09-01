import ImageLink from '../../components/ImageLink/ImageLink.jsx';
import IngredientList from '../../components/IngredientList/IngredientList.jsx';
import CreateRecipeButton from '../../components/CreateRecipeButton/CreateRecipeButton.jsx';
import FoodImage from '../../components/FoodImage/FoodImage.jsx';
import './Home.css';
import {useState} from 'react';

const Home = ({setDataRecipe, onLoading}) => {
    const [imgUrl, setImgUrl] = useState('');
    const [dataIngredient, setDataIng] = useState([]);

    return (
      <div className='container1'>
        <div className='container2'>
          <CreateRecipeButton setDataRecipe={setDataRecipe} dataIngredient={dataIngredient} onLoading={onLoading}/>        
          <ImageLink setImgUrl={setImgUrl} imgUrl={imgUrl} setDataIng={setDataIng} dataIngredient={dataIngredient}/>
        </div>
        <div className='size-shift'>
          <IngredientList dataIngredient={dataIngredient} setDataIng={setDataIng}/>
        </div>
        <FoodImage imgUrl={imgUrl} />
      </div>
    );
}

export default Home;