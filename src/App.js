import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SideBar from './components/SideBar/SideBar/SideBar';
import Header from './components/Header/Header';
import Wrapper from './container/Wrapper';
import InstitutionContainter from './container/InstitutionContainer';
import CategoryContainer from './container/CategoryContainer';

function App() {
  return (
    <>
      <BrowserRouter>
      <SideBar/>
      <Header/>
      <Routes>
        <Route path = '/institutions' element = {<Wrapper children = {<InstitutionContainter/>} />}/>
        <Route path = '/categories' element = {<Wrapper children = {<CategoryContainer/>} />}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
