const Login = () =>{
    return(
        <div className="d-flex flex-column justify-content-center align-items-center p-5">
           <div className="bg-light shadow px-3 py-5 mb-5 rounded">
                <form >
                    <div className="form-group pb-3">
                        <label >Endereço de email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Seu email"/>
                        <small id="emailHelp" className="form-text text-muted">Nunca vamos compartilhar seu email, com ninguém.</small>
                    </div>
                    <div className="form-group pb-3">
                        <label>Senha</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha"/>
                    </div>
                    <div className="pb-3 d-flex flex-row justify-content-between">
                        <button type="submit" className="btn btn-primary">Entrar</button>
                        <button type="submit" className="btn btn-secondary">Cadastrar</button>
                    </div>
                </form>
           </div>
        </div>
    )
}
export default Login