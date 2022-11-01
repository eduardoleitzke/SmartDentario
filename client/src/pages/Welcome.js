import React, { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config.js"


function Welcome(props) {
  const navigate = useNavigate()
  const [confirmate, setConfirmate] = useState("")
  const { confirmationCode } = useParams()
  useEffect(() => {
    async function getConfirmed() {
      try {
        const { data } = await axiosInstance.post("/confirm/" + confirmationCode)

        if (data.status === "Active") {
          setConfirmate("EMAIL VERIFICADO")
          return
        }
        setConfirmate(data.message);
      } catch (error) {
        console.log("algo deu errado", error)
        setConfirmate("HOUVE ALGUM ERRO")
      }
    }
    getConfirmed()
  }, [])


  useEffect(()=>{
    setTimeout(() => {
      navigate("/login")
    }, 4000);
  }, [confirmate])


  return (
    <div className="rec_container">
      <div className="rec_card">
        <p className="confirmate_message">{confirmate}</p>
        <p>Você será redirecionado para tela de login...</p>
      </div>
    </div>
  );
};

export default Welcome;