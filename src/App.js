import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SideBar from './components/SideBar/SideBar/SideBar';
import Header from './components/Header/Header';
import Wrapper from './container/Wrapper';
import InstitutionContainter from './container/InstitutionContainer';
import CategoryContainer from './container/CategoryContainer';
import SupplierContainer from './container/SupplierContainer';
import ProductListContainer from './container/ProductListContainer';
import ProductCreateContainer from './container/ProductCreateContainer';

function App() {
  return (
    <>
      <BrowserRouter>
      <SideBar/>
      <Header/>
      <Routes>
        <Route path = '/institutions' element = {<Wrapper children = {<InstitutionContainter/>} />}/>
        <Route path = '/categories' element = {<Wrapper children = {<CategoryContainer/>} />}/>
        <Route path = '/suppliers' element = {<Wrapper children = {<SupplierContainer/>} />}/>
        <Route path = '/product/list' element = {<Wrapper children = {<ProductListContainer/>} />}/>
        <Route path = '/product/create' element = {<Wrapper children = {<ProductCreateContainer/>} />}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
