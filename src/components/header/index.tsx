import logo from '../../images/Stockbucket.png'
import userPhoto from '../../images/user.png'
import './header.css'

const Header=({})=>{
    type user = {
        username:string,
        name:string
    }
    const user:user={
        username:"jfmartinsvred",
        name:"João Victor Fernandes Martins"
    }
    return(
        <header className="container-header d-flex justify-content-between align-items-center">
            <div className='d-flex justify-content-between align-items-center'>
                <img src={logo} width="128px"></img>
                <div className='d-flex justify-content-between gap-5'>
                    <h5 className='text-light nav-items'>Minhas Ações</h5>
                    <h5 className='text-light nav-items'>Meus Dividendos</h5>
                    <h5 className='text-light nav-items'>Mensagens</h5>
                </div>
            </div>
            <div className='d-flex justify-content-around gap-3 align-items-center px-5'>
                <h6 className='text-light'>{user.username}</h6>
                <img src={userPhoto} alt="Foto Do Usuario" width="64px"/>
            </div>
        </header>
    )
}
export default Header