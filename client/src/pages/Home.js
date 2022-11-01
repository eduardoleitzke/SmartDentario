import React, { useRef, useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import firstImg from "../assets/images/main-image.png"
// import escova from "../assets/images/escova-de-dente.png"
import dentadura from "../assets/images/planejamento-image.png"
import bolinhas from "../assets/images/bolinhas.svg"
import tooth1 from "../assets/images/tooth-1-blue.png"
import tooth2 from "../assets/images/tooth-2-blue.png"
import star from "../assets/images/Icon awesome-star.svg"
import bolinhas_mobile from "../assets/images/bolinhas-mobile.svg"
import {axiosInstance} from "../config.js"
import { Link } from "react-router-dom";

function Home(props) {
    const scroll_list_apresentation = useRef(null)
    const scroll_list_about = useRef(null)
    const scroll_list_planejamento = useRef(null)
    const scroll_list_planos = useRef(null)

    const [message, setMessage] = useState("deu ruim")


    useEffect(() => {
            axiosInstance.get("/").then(res=>{
                setMessage(res.data.message)
            }).catch(err=>console.log(err.message))
    }, [])

    const scrolltoSetciont = (elementRef) =>{
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: "smooth"
        })
    }  
    return (
        <div className="home_container">
            <Nav></Nav>
            
            <section ref={scroll_list_apresentation} className="apresentation">
                <div className="apresentation_firstHalf">
                    <h2>AJUDAMOS VOCÊ A <span className="h2_span">PLANEJAR</span> SEUS IMPLANTES DENTÁRIOS</h2>
                    <p>
                        Implante convencional ou all-on-four? Se esse tipo de dúvida lhe acompanha no dia a dia clínico,
                        conheça a nossa plataforma! Aqui ajudamos você no planejamento de todos os seus casos, de uma forma
                        fácil e didática! Não deixe de vender implantes dentários por medo do planejamento, agora a SAMART PLANEJAMENTO DENTÁRIO
                        faz isso por você!
                    </p>
                    <ul>
                        <li>
                            <button>
                                <a href="/registrar">Criar Conta</a>
                            </button>
                        </li>
                        <li>
                            <button onClick={()=>scrolltoSetciont(scroll_list_planos)}>
                                Ver Planos
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="implante_img"><img src={firstImg} alt="implante" /></div>
            </section>
            <section ref={scroll_list_about} className="about">
                <div className="escova">
                </div>
                <div className="about_text">
                    <h2>QUEM SOMOS NÓS?</h2>
                    <p>
                        Somos uma equipe de dentistas especialistas em implantes dentários,
                        com vasta experiência! Atuamos como implantodontistas realizando implantes unitários
                        protocolos inferiores e superiores, através de diversas técnicas, como a convencional
                        com enxerto ósseo, all on four, zigomático, Pilar Z, enxerto tipo tenda, levantamento de seio maxilar,
                        fixação de tela em titanio, e tantas outras necessárias para a prática odontológica.
                    </p>
                    <p>
                        {/* Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut la
                        bore et dolore magna aliquyam erat, sed diam voluptua. At vero. */}
                    </p>
                </div>

                <img className="bolinhas" src={bolinhas} alt="bolinhas" />
                <img className="bolinhas_mobile " src={bolinhas_mobile} alt="bolinhas_mobile" />
                <img className="tooth1" src={tooth1} alt="tooth1" />
            </section>
            <section ref={scroll_list_planejamento} className="planejamento">
                <div>
                    <img src={dentadura} alt="dentadura_implante" />
                </div>
                <div className="planejamento_texts">
                    <h3>PLANEJAMENTO DENTÁRIO</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                        Lorem ipsum dolor sit amet. Lorem ipsu
                        m dolor sit amet, consetetur sad
                        ipscing elitr, sed diam nonumy.
                    </p>
                    <p>
                        Todo casa necessita de planejamento prévio, realizado
                        iremos ter uma menor taxa de complicação, além de podermos
                        repassar ao paciente, de forma mais precisa, o tempo de duração
                        do tratamento e as expectativas do resultado final. Realizando um
                        planejamento individualizado, aumentamos nossa taxa de sucesso e por consequência,
                        a satisfação do paciente.
                    </p>
                    <p>
                        O planejamento por muitas vezes é desafiador, pacientes que necessitam de enxertos ósseo,
                        idosos com osso poroso, pacientes com anos de uso de prótese total, praticamente sem rebordo osseo,
                        entre outros itens que dificultam o sucesso final do nosso tratamento. Esse é o nosso papel, planejar o seu caso,
                        de uma forma em que você possa executa-lo  do melhor método de implante para aquele paciente em específico.
                        Nosso trabalho é facilitar a sua prática clínica!
                    </p>
                    <h4>
                        Nós fornecemos apenas o planejamento e auxilio teórico nos implantes,
                        a cirurgia é <span>responsabilidade total do profissional</span> que irá realiza-la.
                    </h4>
                    <button><a href="/planos">Ver Planos</a></button>
                </div>
            </section>
            <section ref={scroll_list_planos} className="planos">
                <div>
                    <h4>PLANOS</h4>
                </div>
                <div className="cards_plano">

                    <div className="card_plano_content">
                        <h5>BASICO</h5>
                        <p>Até 50 planejamentos por Mês</p>
                        <p>Tempo de resposta de até 2 dias</p>
                        <p>Contato direto com a equipe</p>
                        <p>R$ 50,00 Mensal</p>
                    </div>
                    <div className="card_plano_content premium">

                        <h5>PREMIUM</h5>
                        <img src={star} alt="star" />
                        <p>Até 100 planejamentos por Mês</p>
                        <p>Resposta em até 24 horas </p>
                        <p>Contato direto com a equipe</p>
                        <p>R$ 100,00 Mensal</p>
                    </div>
                </div>
                <div>
                    <p className="plano_message">
                        Você também pode testar o nosso sistema usando a
                        gratuita que te permite nos enviar um caso para analisarmos
                        e gerarmos o planejamento para você.
                    </p>
                    <button>
                    <a href="/registrar">Criar Conta</a>
                    </button>
                    <img className="tooth2" src={tooth2} alt="tooth2" />
                </div>

            </section>
            <Footer scroll_list_about={scroll_list_about} scroll_list_apresentation={scroll_list_apresentation} scroll_list_planejamento={scroll_list_planejamento}
                scroll_list_planos={scroll_list_planos} ></Footer>
        </div>
    )
}

export default Home