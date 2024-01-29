import './Navbar.css'
import { NavLink} from "react-router-dom"
import { useState} from 'react';

function Navbar(props) {
    const [showNav, setShowNav] = useState(false);

    const mostrarNav = () => {
        setShowNav(!showNav);
    }

    function logOut(){
        if(localStorage.getItem('user')){
            localStorage.removeItem('user');
            setShowNav(!showNav);
            window.location.assign('/');
        }
    }

    if(props.validar()) return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light nav-flex">
            <button className="navbar-toggler" onClick={mostrarNav} type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            


            <div className={showNav ? 'nav nav-show' : 'nav'}>
                <div className='nav__container'>
                    <div className=" navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className='nav-item active'>
                                <button type="button" onClick={mostrarNav} className="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </li>
                            <li className="nav-item active">
                                <NavLink className="nav-link" onClick={mostrarNav} to={'/feed'}>Inicio <span className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink className="nav-link" onClick={mostrarNav} to={`/feed/${localStorage.getItem('user').split(',')[1]}`}>Mis Post <span className="sr-only">(current)</span></NavLink>
                            </li>
                             <li className="nav-item active">
                                <NavLink className="nav-link" onClick={mostrarNav} to={`/profile/${localStorage.getItem('user').split(',')[1]}`}>Mi Perfil</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={logOut}>Cerrar Sesion</NavLink>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
