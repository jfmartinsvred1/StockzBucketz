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

type User={
  email:string
}

function App() {
  const {isLoadingLoggerUser,user,myStocks,setMyStocks}=useAuthContext();

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
              !user ? <Login/> : <Navigate to='/myStocks' />
            }
          />
          <Route path='/myStocks' element={user ?<MyStocks userId={user!==null ?user.uid:user} setMyStockss={setMyStocks} myStockss={myStocks}/> : <Navigate to={'/'}/> } />
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
