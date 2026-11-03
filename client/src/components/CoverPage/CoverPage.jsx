import React from 'react';
import './CoverPage.css';

const CoverPage = React.forwardRef(({title}, ref) => (
  <div className='page-cover' ref={ref}> 
    <h1 id='title-cover' className='w-40'>{title}</h1>
  </div>
));

export default CoverPage;