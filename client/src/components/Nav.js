import React from "react";
import { Link } from "react-router-dom";

function Nav(props) {
    return (
        <header>
            <h1 className="computer_h1">Smart Planejamento Dentário</h1>
            <h1 className="mobile_h1">Smart</h1>
            <ul>
                <li>
                    <button className="registrar"><Link to='/registrar'>Criar Conta</Link></button>
                </li>
                <li>
                    <Link to="/login"><button className="login">Login</button></Link>
                </li>
            </ul>
        </header>
    )
}

export default Nav