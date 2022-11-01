
const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path')
const multer = require('multer')
const multerConfig = require('./multer/multerConfig')
const Planning = require('./models/Planning')
const selectedPlan = require('./Controllers/paymentController')
const createPlan = require('./Controllers/plansController')
const isLogged = require('./Controllers/plansController')
const {registerEmailSenha,planosVerify, verifyPlano, registerController, emailVerfify, loginController, verifyToken, recuperarSenhaController, recuperarSenha, trocarSenha} = require('./Controllers/userController')
mongoose.connect(process.env.MONGODB_URL, (err)=>{
    if(err){
        console.log(err.message)
    }else{
        console.log("DATABASE OK")
    }
})

const app = express()
/*--use*/
app.use("*", express.json())
app.use('*', express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static(path.join(__dirname, "/client/build")))
/*--post*/
app.post("/registerEmailSenha", registerEmailSenha)
app.post("/register", registerController)
app.post("/profile", verifyToken)
app.post("/login", loginController)
app.post('/recuperar_senha', recuperarSenhaController)
app.post('/planos', planosVerify)
app.post('/verifyPlanos',verifyPlano)
app.post('/selectedPlan', selectedPlan)
app.post('/createPlan', isLogged, multer(multerConfig).single('file'), createPlan)

/*--get*/
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
})
app.post('/confirm/:confirmationCode',emailVerfify )
app.post('/recuperar/:recoverPassword', recuperarSenha )

/*--put */
 app.put('/recuperar/:recoverPassword', trocarSenha)

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`)
})

