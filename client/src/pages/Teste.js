import React, { useEffect, useRef, useState } from "react";
import arrow_down from '../assets/images/arrow_down.png'
import arrow from '../assets/images/arrow.svg'
import arrow_btn from '../assets/images/arrow_fillChange.svg'

function Teste(props) {
    const [expandBasico, setExpandBasico] = useState(null)
    const [expandFree, setExpandFree] = useState(null)
    const [expandPremium, setExpandPremium] = useState(null)
    const [showBtn, setShowBtn] = useState(false)
    const check_premium_ref = useRef(null)
    const check_free_ref = useRef(null)
    const check_basico_ref = useRef(null)   
    function verifyCheckBox(e){
      if(e.target === check_free_ref.current){
        check_basico_ref.current.checked = false
        check_premium_ref.current.checked = false
        setShowBtn(check_free_ref.current.checked)
      }
      if(e.target === check_basico_ref.current){
        check_free_ref.current.checked = false
        check_premium_ref.current.checked = false
        setShowBtn(check_basico_ref.current.checked)
      }
      if(e.target === check_premium_ref.current){
        check_basico_ref.current.checked = false
        check_free_ref.current.checked = false
        setShowBtn(check_premium_ref.current.checked)
      }
    }

    return (
        <div className="planos_container">
            <div className="plano_card">
                <div className="card_header">
                    <h3>Escolher Plano</h3>
                    <p>Escolha o seu plano e forma de pagamento ou use a versão trial para testar o nosso sistema!</p>
                </div>
                <div className='todos_planos'>
                    <div  className={expandBasico?"plano_box animationC" : expandBasico === null ? "plano_box": "plano_box animationO"} >
                        <div className="plano_box_header">
                            <div>
                                <input  ref={check_basico_ref} type="checkbox" onClick={(e)=>verifyCheckBox(e)} />
                                <h3>Básico</h3>
                            </div>
                            <img id='basico' onClick={()=>setExpandBasico(!expandBasico)} width={16} height={16} src={arrow_down} alt="arrow" />
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
                    <div  className={expandPremium?"plano_box animationC" : expandPremium === null ? "plano_box": "plano_box animationO"} id='premium'>
                        <div className="plano_box_header">
                            <div>
                                <input  ref={check_premium_ref} type="checkbox" onClick={(e)=>verifyCheckBox(e)} />
                                <h3>Premium</h3>
                            </div>
                            <img onClick={()=>setExpandPremium(!expandPremium)} id='premium'width={16} height={16} src={arrow_down} alt="arrow" />
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
                    {/* ---------------------------- */}
                    <div  className={expandFree?"plano_box animationC" : expandFree=== null ? "plano_box": "plano_box animationO"} id='free'>
                        <div className="plano_box_header">
                            <div>
                                <input ref={check_free_ref}  onClick={(e)=>verifyCheckBox(e)} type="checkbox" />
                                <h3>Free Trial</h3>
                            </div>
                            <img  onClick={()=>setExpandFree(!expandFree)} id='free' width={16} height={16} src={arrow_down} alt="arrow" />
                        </div>
                        <div className="planos_detalhes">
                            <p>Para que você conheça um pouco mais de como funciona
                                a plataforma temos o nosso modo Free, no qual você
                                pode realizar um planejamento!
                            </p>
                            <label>Preço: <span>GRÁTIS</span></label>

                        </div>
                    </div>
                </div>
                <button className={showBtn ? 'none': " planoblock_btn flex"}>Próximo <img color={'#F5F5F5'} src={arrow_btn} alt="arrow_btn" /></button>
                <button  className={showBtn ? 'plano_btn flex': "none"}> <a href='/' target="_blank" rel="noopener noreferrer">Próximo <img color={'#F5F5F5'} src={arrow} alt="arrow_btn" /></a></button>
            </div>
        </div>
    )
}


export default Teste   