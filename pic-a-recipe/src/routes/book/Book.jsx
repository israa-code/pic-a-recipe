import RecipeBook from '../../components/RecipeBook/RecipeBook.jsx';

const Book = ({dataRecipe}) => {

    return (
        <>
            <RecipeBook dataRecipe={dataRecipe} />
        </>
    );
}

export default Book;
