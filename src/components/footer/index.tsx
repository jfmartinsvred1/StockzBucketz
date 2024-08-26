import insta from '../../images/insta.png'
import './footer.css'
const Footer = () =>{
    const widthIcons:string="64px";

    return(
        <footer className="container-footer d-flex justify content-center flex-column p-5 align-items-center gap-4">
            <div id='soon' className="d-flex justify-content-center">
                <img src={insta} alt="Logo Instagram" width={widthIcons}/>
            </div>
            <div className=''>
                <p className='text-light text-on'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem odio iusto, quo amet voluptatum itaque ea reiciendis error veniam et velit voluptates, beatae fuga excepturi tenetur minus sit impedit voluptas.</p>
            </div>
        </footer>
    )
}
export default Footer