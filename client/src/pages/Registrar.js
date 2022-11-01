import React, { useState, useRef, useEffect, useContext } from "react"
// import { useNavigate } from "react-router-dom"
import check_icon from "../assets/images/check-mark.png"
import arrow from "../assets/images/arrow.svg"
import loaded from "../assets/images/loaded.svg"
import emailValidator from 'email-validator'
import {cpf} from "cpf-cnpj-validator"
import { senhaValidator, telValidator} from "../validateData/Validator.js"
import {axiosInstance} from "../config.js"
import { DataContext } from "../contexts/DataContext"
import Telefone from "../components/Telefone.js"
import { useNavigate } from "react-router-dom"
import PlanosCard from "../components/PlanosCard"
function Registrar(props) {
    const navigate = useNavigate()
    const {tel, errorMessage, component} = useContext(DataContext)
    // const navigate = useNavigate()
    /*UseRef */
    const error_message_ref = useRef(null)
    const register_ref = useRef(null)
    const cpf_ref = useRef(null)
    const cro_ref = useRef(null)
    const data_ref = useRef(null)
    const verification_ref = useRef(null)
    const loaded_ref = useRef(null)
    const err_reg_msg = useRef(null)
    const nome_ref = useRef(null)
    const sobrenome_ref = useRef(null)
    // const message_error_ref = useRef(null)
    const check = useRef()
    /*UseState */
    const [telValue, setTelValue] = tel
    const [errorMessageValue, setErrorMessageValue] = errorMessage
    const [componentValue,setComponentValue] = component
    const [cpfValue, setCpfValue] = useState('')
    const [croValue, setCroValue] = useState('')
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [dateValue, setDateValue] = useState('')
    const [date, setDate] = useState("text")
    const [checkIsTrue, setCheckIsTrue] = useState(false)
    const [showpassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState(null)
    const [senha, setSenha] = useState("")
    const [confirmar_senha, setConfirmar_senha] = useState("")
    const [checkTerms, setCheckTerms] = useState(false)
    /* ---FUNCTIONS */
    useEffect(()=>{
        function isOnlyLogged(){
           if(localStorage.getItem('loggedUser') !== null){
            if(localStorage.getItem('loggedUser') !== undefined){
               console.log('2')
                navigate('/profile')
            }
           }
          
       }  
        isOnlyLogged() 
       
     },[])


 

    useEffect(()=>{
        if(message === null){

            err_reg_msg.current.style.display = 'none'
           }else{
            err_reg_msg.current.style.display = 'block '
           }
     }, [message])


     useEffect(()=>{
        if(errorMessageValue === null){
            error_message_ref.current.style.display = 'none'
           }else{
            error_message_ref.current.style.display = 'block '
           }
     }, [errorMessageValue])

     

    function checkverify(check) {
        if (check.target.checked) {
            setCheckIsTrue(true)
            setShowPassword(true)
        } else {
            setCheckIsTrue(false)
            setShowPassword(false)


        }
    }
    async function nextCard() {
      
        if(senha === '' || confirmar_senha === '' || email === ''){
            setMessage('POR FAVOR, PREENCHA  TODOS OS CAMPOS')
            return
        }
        if (!emailValidator.validate(email)) {
            setMessage("Email inválido")
            return
        }
        if (!senhaValidator(senha)[0]) {
            setMessage(senhaValidator(senha)[1])
            return
        }
        if (senha !== confirmar_senha) {
            setMessage('Senhas diferentes')
            return
        }


        else {
            const { data } = await axiosInstance.post("/registerEmailSenha", ({ email, senha }))
            console.log(data)
            try {
                if (data.message === "EMAIL JÁ CADASTRADO") {
                    setMessage(data.message)
                    return
                }
                
                if (data.nextCardIs) {
                    register_ref.current.style.display = "none"
                    data_ref.current.style.display = "flex"
                    setMessage('')
                }

            } catch (error) {
                console.log(data.message)
            }
        }
    }

    async function register() {
    

        if (nome.length<3) {
            setErrorMessageValue("NOME DEVE CONTER NO MÍNIMO 3 CARACTERES")
            nome_ref.current.style.border = "solid 2px #F65A7F"
            cpf_ref.current.style.border = "none"
            cro_ref.current.style.border = "none"
            return
        }else{
            nome_ref.current.style.border = "none"
        }

        if (sobrenome.length<3) {
            setErrorMessageValue("SOBRENOME DEVE CONTER NO MÍNIMO 3 CARACTERES")
            sobrenome_ref.current.style.border = "solid 2px #F65A7F"
            return
        }
       
        else{
            sobrenome_ref.current.style.border = "none"
        }

    
        if (!cpf.isValid(cpfValue)) {
            setErrorMessageValue('CPF INVÁLIDO')
            cpf_ref.current.value = ''
            cpf_ref.current.style.border = "solid 2px #F65A7F"
            return
        }else{
            cpf_ref.current.style.border = "none"
        }
        console.log(cpfValue)
        if (croValue.length < 4 || croValue.length > 5) {
            setErrorMessageValue('CRO INVÁLIDO')
            cro_ref.current.value = ''
            cro_ref.current.style.border = "solid 2px #F65A7F"
            return
        }else{
            cro_ref.current.style.border = "none"
        }
        if(!checkTerms){
            setErrorMessageValue('VOCÊ PRECISA ACEITAR OS TERMOS DE CONTATO')
            return
        }
        setComponentValue(true)

           
            const { data } = await axiosInstance.post("/register", ({ email, senha, nome, sobrenome, cpfValue, telValue, dateValue, croValue }))
            if(data.message === "CPF JÁ CADASTRADO"){
                setErrorMessageValue(data.message)
                return
            }
            if(data.message ==="USÁRIO CADASTRADO COM SUCESSO"){
                data_ref.current.style.display = 'none'
                verification_ref.current.style.display = 'flex'
            }
        
    }

   

  

    function dateFocus() {
        setDate("date")
    }

    function dateBlur() {
        setDate("text")
    }

  

    /*VALORES PRIMEIROS INPUTS*/
    function emailValue(e) {
        setEmail(e.target.value)
    }
    function senhaValue(e) {
        setSenha(e.target.value)
    }
    function confirmarSenhaValue(e) {
        setConfirmar_senha(e.target.value)
    }
    return (

        <div className="register_container">
            <img ref={loaded_ref} className="loaded_icon" src={loaded} alt="load_icon" />
            <h2>Smart Planejamento Dentário</h2>
            {/*PRIMEIRO CARD */}
            <div ref={register_ref} className="register_card">

                <div className="card_header">
                    <h3>Crie sua Conta</h3>
                    <p>Entre com seus dados e crie sua conta para acessar nosso sistema de planejamentos!</p>
                </div>

                <div className="register_card_form">
                    <p ref={err_reg_msg} className="error_register_message">{message}</p>

                    <input onChange={(e) => emailValue(e)} className="register_input" type="email" placeholder="Email" />
                    <div className="register_btns_password">
                        <input onChange={(e) => senhaValue(e)} className="register_input_half" type={showpassword ? "text" : "password"} placeholder="Senha" />
                        <input onChange={(e => confirmarSenhaValue(e))} className="register_input_half" type="password" placeholder="Confirmar Senha" />
                    </div>
                    <p className="cards_login_register_p">8 caracteres mínimo, letra maiúscula, minúsculas, números e pontos</p>
                    <div className="checkbox_container_p">
                        <label className="checkbox_container">Mostrar Senha
                            <input ref={check} onClick={(check) => checkverify(check)} type="checkbox" /><span className="checkmark"><img width={25} src={checkIsTrue ? `${check_icon}` : ""} alt="" /></span></label></div>
                    <button onClick={() => nextCard()} className="register_proximo">
                        <p>Próximo</p><img src={arrow} alt="" />
                    </button>                   
                </div>
            </div>
            {/*VERIFICATION CARD*/}
            <div ref={verification_ref} className="verification_card">
                <div className="card_header">
                    <h3>Verificar Email</h3>
                    <p>Seu cadastro foi concluído e enviamos um email para confirmar a criação!</p>
                </div>
                <a href="/login">Retornar para tela de login.</a>
            </div>
            {/*SEGUNDO CARD*/}
            <div ref={data_ref} className="card date_card">
                <div className="card_header">
                    <h3>Dados Pessoais</h3>
                    <p>Seus dados pessoais são apenas para formalidade e não serão usados por terceiros!</p>
                </div>
                <p ref={error_message_ref} className="error_register_message">{errorMessageValue}</p>
                <div className="register_card_form">
                    <div className="register_btns_password">
                        <input ref={nome_ref} onChange={(e) => setNome(e.target.value)} className="register_input_half" type="text" placeholder="Nome" />
                        <input ref={sobrenome_ref} onChange={(e) => setSobrenome(e.target.value)} className="register_input_half" type="text" placeholder="Sobrenome" />
                    </div>
                    <input ref={data_ref} min={'01-01-2022'} onChange={(e)=>setDateValue(e.target.value)} className="register_input" placeholder="Data de Nascimento" type={date} onFocus={() => dateFocus()} onBlur={() => dateBlur()} />
                    <input ref={cpf_ref} maxLength={11} onChange={(e) => setCpfValue(e.target.value)} name="cpf" className="register_input" type="text" placeholder="CPF" />
                    <input ref={cro_ref} maxLength={5} onChange={(e) => setCroValue(e.target.value)} name="cro" className="register_input" type="text" placeholder="C.R.O" />
                    <Telefone/>
                    <div className="checkbox_container_p">
                        <label className="checkbox_container">Concordo e aceito os termos de contrato
                            <input ref={check} onClick={() => setCheckTerms(!checkTerms)} type="checkbox" /><span className="checkmark"><img width={25} src={checkIsTrue ? `${check_icon}` : ""} alt="" /></span></label></div>
                    <button onClick={() => register()} className="register_proximo" type="submite">
                        <p>Próximo</p><img src={arrow} alt="arrow_icon" />
                    </button>
                </div>
            </div>

            <PlanosCard/>
        </div>
    )
}

export default Registrar