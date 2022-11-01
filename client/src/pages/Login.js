import React, { useRef, useState, useEffect, useContext } from "react";
import check_icon from "../assets/images/check-mark.png"
import {axiosInstance} from "../config.js"
import {Link, useNavigate} from 'react-router-dom'
import { DataContext } from "../contexts/DataContext"
function Login(props){
    const {id} = useContext(DataContext)
    const navigate = useNavigate()
    /* Estados*/
    const [checkIsTrue, setCheckIsTrue] = useState(false)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [message, setMessage] = useState(null)
    /* REF */
    const check = useRef(null) 
    const input1 = useRef(null)
    const input2 = useRef(null)
    const err_msg = useRef(null)
    const login_painel = useRef(null)
    const verification_ref = useRef(null)
    function checkverify(check){
        if(check.target.checked){
            setCheckIsTrue(true)
        }else{
            setCheckIsTrue(false)

        }
    }

    useEffect(()=>{
        function isOnlyLogged(){
           if(localStorage.getItem('loggedUser') !== null){
            if(localStorage.getItem('loggedUser')!== undefined){
               console.log('2')
                navigate('/profile')
            }
           }
          
       }  
        isOnlyLogged() 
     },[])


     useEffect(()=>{
        if(message === null){
            console.log(message)
            err_msg.current.style.display = 'none'
           }else{
            err_msg.current.style.display = 'block '
           }
     }, [message])
    async function Logar(){
        const {data} = await axiosInstance.post("/login", ({email, senha}))
        try {
            console.log(data)
            if(data.message === "EMAIL/SENHA INVÁLIDOS" || data.message === "POR FAVOR PREENCHA TODOS OS CAMPOS"){
                setMessage(data.message)
                input1.current.style.border = "solid 3px #ed3c2ca4 "
                input2.current.style.border = "solid 3px #ed3c2ca4 "
                return
            }
            if(data.message === 'Conta não vericada, por favor verifique seu email'){
                login_painel.current.style.display = 'none'
                verification_ref.current.style.display = 'flex'
                return 
            }
            
            if(data.token){
                localStorage.setItem("loggedUser",data.token)
                if(data.plano){
                    console.log(data.plano)
                    navigate('/profile')
                    return 
                }   
                else {
                    navigate('/planos')
                    return
                }
                
            }
           
            
        } catch (error) {
            setMessage("erro")
        }
    }
    
    //    async function logged(){          
    //         console.log(senha + " + " + email)
    //         const {data} = await axios.post("http://localhost:3001/login    ", {email, senha})    
    //         try {
    //             if(data.message === "EMAIL/SENHA INVÁLIDOS"){
    //                 setMessage(data.message)
    //                 input1.current.style.border = "solid 3px #ed3c2ca4 "
    //                 input2.current.style.border = "solid 3px #ed3c2ca4 "
    //             }
    //         } catch (error) {
    //             throw error
    //         }   
    //     }
   
    function resetError(e){
        input1.current.style.border = "none"
        input2.current.style.border = "none"
        setMessage(null)
    }
    
    function emailValue(e){
        setEmail(e.target.value)
        console.log(e.target.value)
    }

    function passwordValue(e){
        setSenha(e.target.value)
        console.log(e.target.value)
    }

    return(
        <div className="login_container">
            <h2>Smart Planejamento Dentário</h2>
            <div ref={login_painel} className="card login_card">
                <div className="card_header">
                    <h3>Faça seu Login</h3>
                    <p>Entre aqui com sua conta e acesse nosso sistema de planejamentos!</p>
                </div>
                <p ref={err_msg} className="error_login_message">{message}</p>
                <div className="login_card_form">
                    <div className="form">
                        <input ref={input1} onClick={e =>resetError(e)} onChange={(e)=>emailValue(e)} className="login_input" type="email" placeholder="E-mail"/>
                        <input ref={input2} onChange={(e)=>passwordValue(e)} className="login_input" type="password" placeholder="Senha"/>
                            <div className="checkbox_container_p">   
                                <label className="checkbox_container">
                                    Continuar Conectado
                                    <input ref={check} onClick={(check)=>checkverify(check)} type="checkbox"/>
                                    <span className="checkmark"><img width={25} src={checkIsTrue ? `${check_icon}` : "" } alt="" /></span>
                                     
                                </label>
                            </div>
                        <button onClick={(e)=>Logar(e)} className="login" type="submite">Fazer Login</button>
                        
                    </div>
                </div>
                <div className="login_card_footer">
                    <p>Não tem conta ainda? <Link to="/registrar"><span>Crie aqui</span></Link></p>
                    <p><Link to="/recuperar_senha">Esqueci minha senha</Link></p>
                </div>
            </div>
            <div ref={verification_ref} className="verification_card">
                <div className="card_header">
                    <p>Para concluir seu cadastro, por favor verifique seu email!</p>
                    <span style={{color: "blue"}}>Não recebeu email de confirmação? <Link to="/login">clique aqui</Link></span>
                </div>
                
            </div>
        </div>
    )
}

export default Login