import React from 'react';
import './RecipePage.css';
import parse from 'html-react-parser';

const RecipePage = React.forwardRef(({recipe, number}, ref) => {
  
  const charLength = (title) => {
    if(title.length >= 50) {
      return true;
    } return false;
  }

  return (
    <div className='page page-shaddow' ref={ref}> 
      {/* HEADER */}
      <div className='food-header'>
        {/* TITLE, SUMMARY, DETAILS */}
        <div>
          <h2 className='mb0 mt2 tl recipe-title'  id={charLength(recipe.title) ? 'long' : 'short'}>{recipe.title}</h2>
          <p className='mv2 tl lh-copy paragraph'>{parse(recipe.summary.join(' '))}</p>
          <div className='recipe-details'>
            {Object.entries(recipe.info).map(([key, value], i) => (
              <span key={`${recipe.id}-${i}`} className='bold'>
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                <span>{value}</span>
              </span>
            ))}
          </div>
        </div>
        {/* IMAGE */}
        <div>
          <div className='mh2 mv1'>
            <img src={recipe.image} />
          </div>
        </div>
      </div>
      {/* INGREDIENTS */}
      <div>
        <h3 className='mv2 tl sub-title'>Ingredients</h3>
        <ul className='tl mv2 ingredients'>
          {recipe.ingredients.ing.map((ing, i) => {
              return (
                <li key={i}>
                    {ing}
                </li>
              );
          })}
        </ul>
      </div>
      {/* INSTRUCTIONS */}
      <div>
        <h3 className='mv2 tl sub-title'>Instructions</h3>
        <div className='tl mv2 instructions'>
          {parse(recipe.instructions.steps)}
        </div>
      </div>
      {/* NUTRITION */}
      <div className='nutrition mr4'>
        {Object.entries(recipe.nutrition).map(([key, value], i) => (
          <span key={i} className='bold'>
            <span>{key}: </span>
            <span>{value}</span>
          </span>
        ))}
      </div>
      {/* FOOTER */}
      <div id={number%2 === 0 ? 'page-right' : 'page-left'}>
        <div className="page-footer">{number}</div>
      </div>
    </div>
  );
});

export default RecipePage;   