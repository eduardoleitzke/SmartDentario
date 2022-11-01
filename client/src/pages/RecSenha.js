import {axiosInstance} from "../config.js"
import React, { useState, useEffect, useRef } from "react";



function RecSenha(props) {
    const [email, setEmail] = useState(null)
    const [message, setMessage] = useState('')
    const [messageIs, setMessageIs] = useState(null)
    const p_ref = useRef(null)
    function emailValue(e) {
        console.log(e.target.value)
        setEmail(e.target.value)
    }

    useEffect(()=>{
        if(messageIs === null){
            p_ref.current.style.display = "none"
        }else{
            p_ref.current.style.display = "block"

        }
    }, [messageIs])

    async function sendEMailRecuperarSenha() {
        const { data } = await axiosInstance.post('/recuperar_senha', { email })
        try {
            if (data) {
                
                setMessage(data.message)
                if(data.value){
                    setMessageIs(true)
                    return
                }
                setMessageIs(false)
            }
        } catch (error) {
            console.log(error.message)
        }
       
    }
    return (
        <div className="rec_container">
            <p ref={p_ref} className={messageIs ? "messageOk" : "messageFail"}>{message}</p>
            <div className="rec_card">
                <input onChange={(e) => emailValue(e)} id="email" type="email" placeholder="email" />
                <button onClick={() => sendEMailRecuperarSenha()}>recuperar senha</button>
                
            </div>

        </div>
    )
}


export default RecSenha