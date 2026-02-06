import './CreateRecipeButton.css';

const CreateRecipeButton = ({dataIngredient, setDataRecipe, onLoading}) => {
    const KEY = import.meta.env.VITE_KEY;
    const ingredients = dataIngredient.join(',');

    //returns an array of the requested sentences
    const extractSentences = (str, num) => {
        const sentenceRegex = /[^.!?]+[.!?]+/g; //captures full sentences with their punctuation
        const sentences = str.match(sentenceRegex).map(s => s.trim());

        return sentences.slice(0, num);
    }

    const fetchRecipeData = async (recipe) => {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=true&apiKey=${KEY}`)
        const dataInfo = await response.json();

        return dataInfo;
    }

    const extractRecipeData = async (recipe) => {
        const info = await fetchRecipeData(recipe); //recipe info

        return {
            info: {
                prep: info.preparationMinutes === null ? '' : info.preparationMinutes,
                total: info.readyInMinutes === null ? '' : info.readyInMinutes,
                cook: info.cookingMinutes === null ? '' : info.cookingMinutes,
                serving: info.servings === null ? '' : info.servings
            },
            nutrition: {
                calories: info.nutrition.nutrients[0].amount,
                fat: info.nutrition.nutrients[1].amount,
                carbohydrates: info.nutrition.nutrients[3].amount,
                sugar: info.nutrition.nutrients[5].amount,
                protein: info.nutrition.nutrients[10].amount,
                fiber: info.nutrition.nutrients[18].amount
            },
            ingredients: {
                ing: info.extendedIngredients.map(ing => {
                    return ing.original;
                })
            },
            instructions: { 
                steps: info.instructions === null ? '' : info.instructions
            },
            summary: extractSentences(info.summary, 2)
        }
    }
    //fetch recipe by ingredients and setDataRecipe
    const handleButtonClick = async () => {
        try {
            onLoading(true);
            const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&ranking=1&ignorePantry=true&apiKey=${KEY}`)
            const recipeData = await response.json();

            const finalDataRecipe = [];

            for (const recipe of recipeData) {
                const recipeData = await extractRecipeData(recipe);
                finalDataRecipe.push({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                ...recipeData
                });
            }
            setDataRecipe([...finalDataRecipe]);

            onLoading(false);

        } catch(error) {
            console.log('Error handleButtonClick:', error);
        }
    }
    return (
        <div className='h-20'>
            <button onClick={handleButtonClick} className='button-84 grow link'>Create Recipes</button>
        </div>
    );
}

export default CreateRecipeButton;