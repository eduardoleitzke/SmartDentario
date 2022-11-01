import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../config.js"
import PlanejamentosCard from '../components/PlanejamentosCard.js'
import ProfileMenu from "../components/ProfileMenu.js";
import MyPlansBack from '../assets/images/profileImages/myPlansBack.svg'
import galleryBack from '../assets/images/profileImages/galleryBack.svg'
import callPlansBack from '../assets/images/profileImages/callPlansBack.svg'
import { useNavigate } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";


// import iconGallery from '../assets/images/profileImages/gallery.svg'
function Profile(props) {
    const [loading, setLoading] = useState(false)
    const [loadingColor, setLoadingColor] = useState('#13ff85')
    const navigate = useNavigate()
    useEffect(() => {
        async function verifyToken(){
                  let token = localStorage.getItem('loggedUser')
                  const {data} = await axiosInstance.post('/profile', {token})
                  console.log(data.message)
                  if(data.message !== 'authorized'
                  ){
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
    useEffect(() => {
        console.log(localStorage.getItem('loggedUser'))
        async function verifyToken() {
            console.log('a')
            if (localStorage.getItem('loggedUser')) {
                let token = (localStorage.getItem('loggedUser'))

                const { data } = await axiosInstance.post("/profile", { token })
                if (data.message === 'unauthorized') {
                    navigate('/login')
                    localStorage.clear('loggedUser')
                }
            }
        }
        setInterval(() => {
            verifyToken()
        }, 800000);
    })


    return (

        <div id="profileCotainer">
            <ProfileMenu color='#fff'></ProfileMenu>
            { loading ? (
                    <BounceLoader
                    className="loadingProfile"
                    color={loadingColor}
                    loading={loading}
                    size={150}
                    aria-label="BounceLoader"
                    data-testid="loader" 
                     />
                    )

                    : (
                        <><div className="myPlans">
                        <div className="myPlansHeader">
                            <img className="plansBack" src={MyPlansBack} alt="MyPlansBack" />
                            <h3>MEUS PLANEJAMENTOS</h3>
                            <p>Aqui estão disponíveis alguns dos planejamentos
                                que estão ainda em aberto e também os que já foram concluídos. Para ver mais, você pode acessar
                                a interface de "meus planejamentos" no menu lateral ou pelo botão no final da seção.</p>
                        </div>
                        <div className="openPlans">
                            <h4>EM ABERTO</h4>
                            <PlanejamentosCard />
                        </div>
                        <div className="finishedPlans">
                            <h4>CONCLUIDOS</h4>
                            <PlanejamentosCard />
                        </div>
                        <button>Ver Planejamentos</button>
                    </div><div className="galleryAndNewPlans">
                            <div className="galleryAndnewPlansStyle">
                                <img className="callPlansBack" src={callPlansBack} alt="callPlansBack" />
                                <div>
                                    <h3>NOVO PLANEJAMENTO</h3>
                                    <p>Através do botão abaixo ou do menu lateral, você pode acessar a seção para solicitar um novo planejamento.</p>
                                </div>

                                <button>Novo planejamento</button>
                            </div>
                            <div className="galleryAndnewPlansStyle">
                                <img className="callPlansBack" src={galleryBack} alt="galleryBack" />
                                <div>
                                    <h3>GALERIA DE CASOS</h3>
                                    <p>Ao clicar no botão abaixo ou através do menu lateral, você pode visualizar uma galeria com todos os casos que já auxiliamos.</p>
                                </div>

                                <button>Ver Galeria de Casos</button>
                            </div>
                        </div></>
                    )
            
            
            }
            
        </div>
    )
}

export default Profile