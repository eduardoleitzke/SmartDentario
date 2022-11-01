import React, { useState } from "react";
import {axiosInstance} from '../config'

function Chamados(props) {
    const [file, setFiles] = useState(null)
    const [description, setDescription] = useState('')
    const [procedure, setProcedure] = useState('')
    function sendDatas(){
            const formData = new FormData()
            formData.append('file', file)
            formData.append('procedure', procedure)
            formData.append('description', description)
            console.log([...formData])
            axiosInstance.post('/planejamentos',formData)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }
    function sendFile(e){
        console.log(e.target.files)
        setFiles(e.target.files[0])
    }
    return(
        <div className={props.show ? "none" : "profile_content"} > 
                   <div className="content">
                        <h3>Chamados</h3>
                        <ul className="content_list">
                           <li>
                                <div className="contet_li_cabecalho">
                                    <h2>Preencha todos os dados</h2>                                   
                                </div>
                                <div className="show_content">
                                    <label>Tipo do procedimento: </label>
                                    <select onChange={(e)=>setProcedure(e.target.value)} name="list">
                                        <option value="0" hidden></option>
                                        <option value="Implante" key="1">Implante</option>
                                        <option value="Extração" key="2">Extração</option>
                                        <option value="Outro" key="3">Outro</option>
                                    </select>
                                   
                                </div> 
                                <div className="show_content">
                                    <label>Descreva o procedimento: </label>
                                    <textarea onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="Descreva detalhadamente seu procedimento." />                                   
                                </div>
                                <div className="show_content">
                                    <label>Anexar documentos: </label>
                                    <input  onChange={(e)=>sendFile(e)} type="file" />
                                </div>
                                <div className="show_content_button">
                                    <button onClick={()=>sendDatas()}>Enviar</button>
                                </div>                                                         
                            </li>
                           </ul>                                                                                  
                    </div>                
            </div>
    )
}


export default Chamados