import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading";
import ValidationError from "../validationError";
import AuthService from "../../services/AuthService";
import { isEmailValid } from "../../helpers/emailHelper";
import { useAuthContext } from "../../contexts/auth/AuthContext";

const Register = () => {
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

      const [lastEmail,setLastEmail]=useState<string>("")

      const [showLoading,setShowLoading]=useState(false);
    
      const [error, setError]=useState(null as any);
    
      const navigate = useNavigate();
    
      function goToPage(location: string) {
        navigate(location);
      }
    
      async function register(e:React.FormEvent) {
        e.preventDefault()
        setShowLoading(true);
        await authService.register(form.email.value, form.password.value)
        .then(()=>{
            setShowLoading(false);
            goToPage('myStoks')
        })
        .catch((err)=>{
            if(err.code==='auth/email-already-in-use'){
                setLastEmail(form.email.value)
            }
            
            setShowLoading(false)
        })
      }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-5 my-5">
            <div className="bg-light shadow px-3 py-5 pb-4 rounded">
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
                            id="exampleInputEmail2"
                            aria-describedby="emailHelp"
                            placeholder="Seu email"
                            data-testid="email"
                        />
                        <ValidationError
                            hasChagend={form.email.hasChanged}
                            errorMessage="Email já está em uso"
                            testId="email-required"
                            lastEmail={lastEmail}
                            type="emailInUse"
                            value={form.email.value}
                        />
                        <ValidationError
                            hasChagend={form.email.hasChanged}
                            errorMessage="Email é obrigatório"
                            testId="email-required"
                            lastEmail={lastEmail}
                            type="required"
                            value={form.email.value}
                        />
                        <ValidationError
                            hasChagend={form.email.hasChanged}
                            errorMessage="Digite um email válido"
                            testId="email-required"
                            lastEmail={lastEmail}
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
                            id="exampleInputPassword2"
                            placeholder="Senha"
                            data-testid="password"
                        />
                        {error && <div className="error" data-testid="error">{error.message}</div>}
                    </div>
                    <div className="form-group pb-3">
                        <label>Confime Sua Senha</label>
                        <input
                            value={form.password.value}
                            onChange={(e) => {
                                setForm({ ...form, password: { hasChanged: true, value: e.target.value } });
                            }}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword3"
                            placeholder="Confime Sua Senha"
                            data-testid="password"
                        />
                        {error && <div className="error" data-testid="error">{error.message}</div>}
                    </div>
                    <div className="pt-3 d-flex flex-row justify-content-center">
                        <button
                            onClick={(e) => register(e)}
                            disabled={!isEmailValid(form.email.value)}
                            className="btn btn-primary"
                            data-testid="btn-register"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
            {showLoading && <Loading />}
        </div>
    );
};

export default Register;
