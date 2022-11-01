import React from "react";
import instagram_icon from "../assets/images/Icon awesome-instagram.svg"
import twitter_icon from "../assets/images/Icon awesome-twitter.svg"
import facebook_icon from "../assets/images/Icon awesome-facebook-f.svg"
import linkedin_icon from "../assets/images/Icon awesome-linkedin-in.svg"

function Footer(props) {
  

    const scrolltoSetciont = (elementRef) =>{
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: "smooth"
        })
    }
    return (
        <footer>
            <div className="footer_first_half">
                <div className="redes_socias">
                    <h3>Smart Planejamento Dentário</h3>
                    <p> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et
                        dolore magna aliquyam erat,
                        sed diam voluptua. At vero eos et accusam et.
                    </p>
                    <ul>
                        <li><a href="/instagram"><img src={instagram_icon} alt="" /></a></li>
                        <li><a href="/instagram"><img src={twitter_icon} alt="" /></a></li>
                        <li><a href="/instagram"><img src={facebook_icon} alt="" /></a></li>
                        <li><a href="/instagram"><img src={linkedin_icon} alt="" /></a></li>
                    </ul>
                </div>
                <div className="footer_lists">
                    <div className="explorar">
                        <h4>Explorar</h4>
                        <ul>
                            <li onClick={()=>scrolltoSetciont(props.scroll_list_apresentation)}>Início</li>
                            <li onClick={()=>scrolltoSetciont(props.scroll_list_about)}>Quem Somos Nós</li>
                            <li onClick={()=>scrolltoSetciont(props.scroll_list_planejamento)}>Planejamento Dentário</li>
                            <li onClick={()=>scrolltoSetciont(props.scroll_list_planos)}>Planos</li>
                        </ul>
                    </div>
                    <div className="entre_contato">
                        <h4>Entre em Contato</h4>
                        <ul>
                            <li>suporte@smartplanejamento.com.br</li>
                            <li>(53) 9999-9999</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer_second_half">
                <p>© Smart Planejamento Dentário 2022</p>
                <ul>
                    <li><a href="/termos">Termos e Condições</a></li>
                    <li><a href="/politica">Polítca de Privacidade</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer