import React from "react";
import { Link } from "react-router-dom";

function NotFound(props){
    return(
    <div>
        <p>  Not found!  </p>
        <Link to='/'>Voltar para página inicial.</Link>
    </div>
    )
}

export default NotFound