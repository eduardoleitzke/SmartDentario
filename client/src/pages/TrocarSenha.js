import React from "react";
import { useEffect, useState, useRef} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import {axiosInstance} from "../config.js"
import { senhaValidator } from "../validateData/Validator";

function TrocarSenha(props) {
  const navigate = useNavigate()
  const trocarSenha_ref = useRef(null)  
  const p_ref = useRef(null)
  const [confirmate, setConfirmate] = useState(false)
  const [messageError, setMessageError] = useState('')
  const[senha, setSenha] = useState('')
  const [messageIs, setMessageIs] = useState(null)
  const[senhaReply, setSenhaReply] = useState(null)
  const [userId, setUserId] = useState(null)
  const {recoverPassword} = useParams()
  useEffect(()=>{
    if(messageIs === null){
        p_ref.current.style.display = "none"
    }else{
        p_ref.current.style.display = "block"

    }
}, [messageIs])

  useEffect(()=>{
    async function getConfirmed(){
      try{
        console.log(recoverPassword)
        const {data} = await axiosInstance.post("/recuperar/" + recoverPassword)
       console.log(data)
        if(data.message === "true"){
          console.log(data.id)
          setConfirmate(true)
          setUserId(data.id)
                  return
        }else{
          navigate("/")
        }
        setConfirmate(data.message);
      }catch(error){
        console.log("algo deu errado", error)
        setConfirmate("HOUVE ALGUM ERRO")
      }
    }
    getConfirmed()
  },[])   
     
 function senhaValue(e){
    setSenha(e.target.value)
 }

 function confirmarSenhaValue(e){
    setSenhaReply(e.target.value)
 }

 async function enviarNovaSenha(){
    if(senha !== senhaReply){
        setMessageError('Senha diferentes')
        setMessageIs(false)
        return
    }if(!senhaValidator(senha)[0]){
        setMessageIs(false)
        setMessageError(senhaValidator(senha)[1])
        return
    }else{
        const {data} = await axiosInstance.put("/recuperar/" + recoverPassword, {senha, id:userId})
        try {
          setMessageIs(true)
          setMessageError(data.message)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
 }

  return (
    
    <div ref={trocarSenha_ref} className={confirmate ? "rec_container" : ""}>
      <p ref={p_ref} className={messageIs ? "messageOk" : "messageFail"}>{messageError}</p>
        <div className="rec_card">
        <input onChange={(e)=>senhaValue(e)} type="password" placeholder="Digite a nova senha" />  
        <input onChange={(e)=>confirmarSenhaValue(e)} type="password" placeholder="Confirme a nova senha"/>
        <button onClick={()=>enviarNovaSenha()}>Enviar</button>
        
        </div>
    </div>
  );
};

export default TrocarSenha;