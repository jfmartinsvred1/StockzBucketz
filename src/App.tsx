import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Login from './components/login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthService from './services/AuthService';
import MyStocks from './components/myStocks';
import Register from './components/register';
import Loading from './components/loading';
import { useAuthContext } from './contexts/auth/AuthContext';
import { Portfolio, StockBrapi } from './models/types';
import {  useState } from 'react';

function App() {
  const {isLoadingLoggerUser,user}=useAuthContext();

  const [portfolio, setPortfolio] = useState<Portfolio>();
  const [allStocks, setAllStocks] = useState<StockBrapi[]>([
    {
        change: 0,
        close: 0,
        log: "",
        market_cap: 0,
        name: "",
        sector: "",
        stock: "",
        type: "",
        volume: 0
    }
]);
    
  return (
    <>
      {
      !isLoadingLoggerUser && 
      <BrowserRouter>
        <Header authService={new AuthService()} email={user!==null ? (user).email:user}/>
        <Routes>
          <Route 
            path='/' 
            element={
              !user ? <Login setPortfolio={setPortfolio} setAllStocks={setAllStocks}/> : <Navigate to='/myStocks' />
            }
          />
          <Route path='/myStocks' element={user ?<MyStocks setAllStocks={setAllStocks} allStocks={allStocks} portfolio={portfolio!} setPortfolio={setPortfolio} userId={user!==null ?user.uid:user} /> : <Navigate to={'/'}/> } />
          <Route path='/register' element={!user ?<Register  />:<Navigate to={'/myStocks'}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      }
      {isLoadingLoggerUser && <Loading />}
      
    </>
  );
}

export default App;
