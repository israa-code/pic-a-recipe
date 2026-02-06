import Navigation from './components/Navigation/Navigation.jsx';
import Home from './routes/home/Home.jsx';
import Book from './routes/book/Book.jsx';


import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';

import './App.css';
import 'tachyons';

function App() {
  const [dataRecipe, setDataRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  

  const onLoading = (status) => setIsLoading(status);
  

  useEffect(() => {
        console.log('Updated dataRecipe:', dataRecipe);
    }, [dataRecipe]); 

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigation isLoading={isLoading}/>}>
          <Route index element={<Home dataRecipe={dataRecipe} setDataRecipe={setDataRecipe} onLoading={onLoading} />} />
          <Route path='book' element={<Book dataRecipe={dataRecipe} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
