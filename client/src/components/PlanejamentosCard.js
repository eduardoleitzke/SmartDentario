import React from 'react';
import arrow from '../assets/images/profileImages/arrow.svg'
function PlanejamentosCard() {
    return ( 
        <div className="plansCard">
            <ul className='plansCardHeaders'>
                <li>Paciente</li>
                <li>Procedimento</li>
                <li>Data da solcitação</li>
            </ul>
            <ul className='plansCardDetails'>
                <li>João da Silva</li>
                <li>Implante Dentário</li>
                <li>11 de Novembro <img src={arrow} alt="arrow" /></li>
            </ul>
            <ul className='plansCardDetails'>
                <li>João da Silva</li>
                <li>Implante Dentário</li>
                <li>11 de Novembro <img src={arrow} alt="arrow" /></li>
            </ul>
        </div>
     );
}

export default PlanejamentosCard;