import HTMLFlipBook from 'react-pageflip';
import RecipePage from '../RecipePage/RecipePage';
import CoverPage from '../CoverPage/CoverPage';
import 'tachyons';

const RecipeBook = ({dataRecipe}) => {
    //filter out recipes missing instructions or ingredients
    const validateRecipes = (recipes) => {
        return (recipes.instructions.steps.length !== 0 && recipes.ingredients.ing.length !== 0)    
    }
    return (
        <div className="center ma4">
            <HTMLFlipBook showCover={true} width={450} height={650} maxShadowOpacity={0.5}>
                <CoverPage title="My Recipe Book"></CoverPage>
                {dataRecipe.filter(validateRecipes).map((recipe, i) => {
                    return <RecipePage key={recipe.id} recipe={recipe} number={i+1}>Page text</RecipePage>
                })}
            </HTMLFlipBook>
        </div>
    );
}

export default RecipeBook;