import React, {useEffect, useState} from 'react'
import { axiosInstance } from "../config.js"
import { useNavigate } from 'react-router-dom'
function CriarPlano(props){
    const navigate = useNavigate()
    const [invocator, setInvocator] = useState('')
    useEffect(() => {
          async function verifyToken(){
                    let token = localStorage.getItem('loggedUser')
                    const {data} = await axiosInstance.post('/profile', {token})
                    console.log(data.message)
                    if(data.message === 'authorized'
                    ){
                        setInvocator(data.decoded.id)
                    }
                    else
                    {
                        localStorage.clear('loggedUser')
                        navigate('/login')
                    }              
                 
            }             
            
        if(localStorage.getItem('loggedUser') === null)
        {
           return navigate('/login')
        }
        else
        {
          verifyToken()
        }
       
    }, [])
    return(
        <div className='container'>
            <form>
            <input type="text" placeholder='Procedimento'/>
            <input type="text" placeholder='Idade'/>
            <input placeholder='Descrição'/>
            <input type="file" />
            </form>
        </div>
    )
}

export default CriarPlano