import { useState } from 'react'
import logo from '../../images/Stockbucket.png'
import AuthService from '../../services/AuthService'
import Loading from '../loading'
import './header.css'
import { useNavigate } from 'react-router-dom'



type HeaderProps = {
    email: string
    authService: AuthService
}

const Header = (props: HeaderProps) => {
    const [isLogginOut,setIsLogginOut]=useState(false)
    const navigate = useNavigate()

    const logout = () => {
        setIsLogginOut(true)
        props.authService.logout().then(()=>{
            setIsLogginOut(false);
            navigate('/');
        })
    }

    return (
        <>
            <header className="container-header d-flex justify-content-between align-items-center">
                <div className='d-flex justify-content-between align-items-center'>
                    <img src={logo} width="128px"></img>
                    <div className='d-flex justify-content-between gap-5'>
                        <h5 className='text-light nav-items'>{props.email != null ? "Minhas Ações" : ""}</h5>
                        <h5 className='text-light nav-items'>{props.email != null ? "Meus Dividendos" : ""}</h5>
                        <h5 className='text-light nav-items'>{props.email != null ? "Mensagens" : ""}</h5>
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-around gap-1 align-items-end px-5'>
                    <h6 className='text-light'>{props.email}</h6>
                    <button className='btn text-light' onClick={(e) => logout()}>{props.email != null ? "Sair":''}</button>
                </div>
            </header>
            {isLogginOut && <Loading/>}
        </>

    )
}
export default Header