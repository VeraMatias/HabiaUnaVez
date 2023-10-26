import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SideBar from './components/SideBar/SideBar/SideBar';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <BrowserRouter>
      <SideBar/>
      <Header/>
      <Routes>


      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
