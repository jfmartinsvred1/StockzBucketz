import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthService from './services/AuthService';
import MyStocks from './components/myStocks';
import { useState } from 'react';
import { MyStock } from './models/Stock';
import Register from './components/register';

function App() {
  const [myStocks, setMyStocks] = useState<MyStock[]>([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path='/' element={<Login authService={new AuthService()}/>} />
            <Route path='/myStocks' element={<MyStocks setMyStockss={setMyStocks} myStockss={myStocks} />} />
            <Route path='/register' element={<Register authService={new AuthService()}/>} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
