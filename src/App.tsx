import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Home from './components/home';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthService from './services/AuthService';
import MyStocks from './components/myStocks';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path='/' element={<Login authService={new AuthService()}/>} />
            <Route path='/myStocks' element={<MyStocks/>} />
            <Route path='/register' element={<Home/>} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
