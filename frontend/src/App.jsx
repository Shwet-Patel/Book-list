import {BrowserRouter , Routes , Route} from 'react-router-dom';
import {Home , CreateBook , EditBook , DeleteBook , ShowBook } from './pages';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/books/create' element = {<CreateBook/>}/>
        <Route path='/books/details/:id' element = {<ShowBook/>}/>
        <Route path='/books/edit/:id' element = {<EditBook/>}/>
        <Route path='/books/delete/:id' element = {<DeleteBook/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;