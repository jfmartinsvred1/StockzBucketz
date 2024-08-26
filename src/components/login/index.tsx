import { useState } from "react"
import { isEmailValid } from "../../helpers/emailHelper"
import ValidationError from "../validationError"

const Login = () =>{

    const [form,setForm]=useState({
        email:{
            value:"",
            hasChanged:false
        },
        password:{
            value:"",
            hasChanged:false
        },
    })

    return(
        <div className="d-flex flex-column justify-content-center align-items-center p-5">
           <div className="bg-light shadow px-3 py-5 mb-5 rounded">
                <form >
                    <div className="form-group pb-3">
                        <label >Endereço de email</label>
                        <input value={form.email.value} onChange={(e)=>{setForm({...form,email: {hasChanged:true,value:e.target.value}})}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Seu email" data-testid='email'/>
                        <ValidationError
                            hasChagend={form.email.hasChanged}
                            errorMessage="Email é obrigatório"
                            testId='email-required'
                            type="required"
                            value={form.email.value}
                        />
                        <ValidationError
                            hasChagend={form.email.hasChanged}
                            errorMessage="Email inválido"
                            testId='email-invalid'
                            type="email"
                            value={form.email.value}
                        />
                        <small id="emailHelp" className="form-text text-muted">Nunca vamos compartilhar seu email, com ninguém.</small>
                    </div>
                    <div className="form-group pb-3">
                        <label>Senha</label>
                        <input value={form.password.value} onChange={(e)=>{setForm({...form,password:{hasChanged:true,value:e.target.value}})}} type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha" data-testid="password"/>
                        <ValidationError
                            hasChagend={form.password.hasChanged}
                            errorMessage="Senha é obrigatória"
                            testId='password-required'
                            type="required"
                            value={form.password.value}
                        />
                    </div>
                    <div className="pb-3 d-flex flex-row justify-content-between">
                        <button disabled={!isEmailValid(form.email.value)} type="submit" className="btn btn-primary" data-testid='btn-login'>Entrar</button>
                        <button type="submit" className="btn btn-secondary" data-testid='btn-resgister'>Cadastrar</button>
                    </div>
                </form>
           </div>
        </div>
    )
}
export default Login