import React, { useState } from "react";
import { isEmailValid } from "../../helpers/emailHelper";
import ValidationError from "../validationError";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Loading from "../loading";
import { useAuthContext } from "../../contexts/auth/AuthContext";
import { GetAllStocs, GetPortfolio } from "../../services/ApiService";
import { Portfolio, StockBrapi } from "../../models/types";


type LoginProps={
  setAllStocks:(allStocks:StockBrapi[])=>void,
  setPortfolio:(portfolio:Portfolio)=>void
}

const Login = ({setAllStocks,setPortfolio}:LoginProps) => {

  const {authService}:{authService:AuthService}=useAuthContext();

  const [form, setForm] = useState({
    email: {
      value: "",
      hasChanged: false,
    },
    password: {
      value: "",
      hasChanged: false,
    },
  });
  
  const [showLoading,setShowLoading]=useState(false);

  const [error, setError]=useState(null as any);

  const navigate = useNavigate();

  function goToPage(location: string) {
    navigate(location);
  }

  async function login(e:React.FormEvent) {
    e.preventDefault()
    setShowLoading(true);
    await authService.login(form.email.value, form.password.value)
    .then((user)=>{
      GetPortfolio(user.user.uid).then((data)=>setPortfolio(data)).catch((err)=>console.log(err))
      GetAllStocs().then((data)=>setAllStocks(data)).catch((err)=>console.log(err))
      setShowLoading(false);
    })
    .catch((err)=>{
      setShowLoading(false)
      setError(err)
    });
    navigate('/myStocks');
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5">
      <div className="bg-light shadow px-3 py-5 mb-5 rounded">
        <form>
          <div className="form-group pb-3">
            <label>Endereço de email</label>
            <input
              value={form.email.value}
              onChange={(e) => {
                setForm({ ...form, email: { hasChanged: true, value: e.target.value } });
              }}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Seu email"
              data-testid="email"
            />
            <ValidationError
              hasChagend={form.email.hasChanged}
              errorMessage="Email é obrigatório"
              testId="email-required"
              type="required"
              lastEmail=""
              value={form.email.value}
            />
            <ValidationError
              lastEmail=""
              hasChagend={form.email.hasChanged}
              errorMessage="Email inválido"
              testId="email-invalid"
              type="email"
              value={form.email.value}
            />
            <small id="emailHelp" className="form-text text-muted">
              Nunca vamos compartilhar seu email, com ninguém.
            </small>
          </div>
          <div className="form-group pb-3">
            <label>Senha</label>
            <input
              value={form.password.value}
              onChange={(e) => {
                setForm({ ...form, password: { hasChanged: true, value: e.target.value } });
              }}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Senha"
              data-testid="password"
            />
            <ValidationError
              lastEmail=""
              hasChagend={form.password.hasChanged}
              errorMessage="Senha é obrigatória"
              testId="password-required"
              type="required"
              value={form.password.value}
            />
            {error && <div className="error" data-testid="error">{error.message}</div>}
          </div>
          <div className="pb-3 d-flex flex-row justify-content-between">
            <button
              onClick={(e)=>login(e)}
              disabled={!isEmailValid(form.email.value)}
              className="btn btn-primary"
              data-testid="btn-login"
            >
              Entrar
            </button>
            <button
              onClick={() => goToPage('/register')}
              className="btn btn-secondary"
              data-testid="btn-register"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
      { showLoading && <Loading/>}
    </div>
  );
};

export default Login;
