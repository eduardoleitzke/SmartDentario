import React, {  useEffect, useRef, useState } from "react";
import arrow_down from '../assets/images/arrow_down.png'
import arrow from '../assets/images/arrow.svg'
import arrow_btn from '../assets/images/arrow_fillChange.svg'
import { Link } from "react-router-dom";
import {axiosInstance} from "../config.js"
function PlanosCard(props) {
    const [showhidebasico, setShowHideBasico] = useState(false)
    const [showhidepremium, setShowHidePremium] = useState(false)
    const [checkValue, setCheckValue] = useState(false)
    const [urlPagamento, setUrlPagamento] = useState('')
    const [planoDisplay, setPlanoDisplay] = useState(false)
    /*--------------------refs*/
    const basico_ref = useRef(null)
    const premium_ref = useRef(null)
    const premium_check = useRef(null)
    const basico_check = useRef(null)
    const btnblock_ref = useRef(null)
    const btn_ref = useRef(null)
    useEffect(()=>{
           if(checkValue){
            btnblock_ref.current.style.display = 'none'
            btn_ref.current.style.display = 'flex'
           } else{
            btnblock_ref.current.style.display = 'flex'
            btn_ref.current.style.display = 'none'
           }
    }, [checkValue])


    function premiumCheck(){
        basico_check.current.checked = false
        setUrlPagamento('https://mpago.la/1wjRXYZ')
        if( premium_check.current.checked === false){
            setCheckValue(false)
        }else{
            setCheckValue(true)
        }
    }

    function basicoCheck(){
        setUrlPagamento('https://mpago.la/1hGkWsq') 
        premium_check.current.checked = false
        if( basico_check.current.checked === false){
              
        setCheckValue(false)
    }else{
        setCheckValue(true)
    }
}

    function expandirDetalhes(e){
        console.log(e.target.id)
            if(e.target.id === 'basico'){
                if(!showhidebasico){
                basico_ref.current.classList.remove('animationO')
                basico_ref.current.classList.toggle('animationC')  
                setShowHideBasico(true)
                }else{
                    basico_ref.current.classList.remove('animationC')
                    basico_ref.current.classList.toggle('animationO')  
                    setShowHideBasico(false)
                }
            }
            if(e.target.id === 'premium'){
                if(!showhidepremium){
                premium_ref.current.classList.remove('animationO')
                premium_ref.current.classList.toggle('animationC')  
                setShowHidePremium(true)
                }else{
                    premium_ref.current.classList.remove('animationC')
                    premium_ref.current.classList.toggle('animationO')  
                    setShowHidePremium(false)
                }
            }
    }
    return (
       
            <div  className={!planoDisplay ? 'none' : 'plano_card'}>
                <div className="card_header">
                    <h3>Escolher Plano</h3>
                    <p>Escolha o seu plano e forma de pagamento ou use a versão trial para testar o nosso sistema!</p>
                </div>
                <div className='todos_planos'>
                    <div ref={basico_ref} className="plano_box" >
                        <div className="plano_box_header">
                            <div>
                                <input ref={basico_check} onClick = {()=>basicoCheck()} type="checkbox" />
                                <h3>Básico</h3>
                            </div>
                            <img id= 'basico' onClick={(e)=>expandirDetalhes(e)} width={16} height={16} src={arrow_down} alt="arrow" />
                        </div>
                        <div className="planos_detalhes">
                            <ul>
                                <li>Até 50 planejamentos por Mês</li>
                                <li>Tempo de resposta de até 2 dias</li>
                                <li>Contato direto com a equipe</li>

                            </ul>
                            
                                <label>Preço: <span>R$ 50,00</span></label>
                            
                        </div>
                    </div>
                    {/* ---------------------------- */}
                    <div ref={premium_ref} className="plano_box" id='premium'>
                        <div className="plano_box_header">
                            <div>
                                <input onClick={()=>premiumCheck()} ref={premium_check} type="checkbox" />
                                <h3>Premium</h3>
                            </div>
                            <img id= 'premium' onClick={(e)=>expandirDetalhes(e)} width={16} height={16} src={arrow_down} alt="arrow" />
                        </div>
                        <div className="planos_detalhes">
                            <ul>
                                <li>Até 100 planejamentos por Mês</li>
                                <li>Tempo de resposta de até 1 dias</li>
                                <li>Contato direto com a equipe</li>

                            </ul>
                            
                                <label>Preço: <span>R$ 100,00</span></label>
                            
                        </div>
                    </div>

                </div>
                <button ref={btnblock_ref} className=" planoblock_btn">Próximo <img color={'#F5F5F5'} src={arrow_btn} alt="arrow_btn" /></button>
               <button  ref={btn_ref} className=" plano_btn"> <a href={urlPagamento} target="_blank" rel="noopener noreferrer">Próximo <img color={'#F5F5F5'} src={arrow} alt="arrow_btn" /></a></button>
            </div>

            
        
    )
}


export default PlanosCard