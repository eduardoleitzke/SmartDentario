
require("dotenv").config()
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const ObjectId = require('mongodb').ObjectId;

async function registerEmailSenha(req,res){
  const check = await User.findOne({ email:req.body.email })
  if (check){
      return res.status(200).json({message:"EMAIL JÁ CADASTRADO"})
  }else{
    return res.status(200).json({nextCardIs: true})
  }

}

async function registerController(req,res){
  const usercpf = await User.findOne({cpf: req.body.cpfValue})
  if(usercpf){
   return res.status(200).json({message: "CPF JÁ CADASTRADO"})
}
  const usercro = await User.findOne({cro: req.body.croValue})
  if(usercro){
    return res.status(200).json({message: "CRO JÁ CADASTRADO"})
  }
    function tokenGenerator() {
      const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let token = '';
      for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
      }
      return token
    }
    let token1 = tokenGenerator();
    let token2 = tokenGenerator();
    console.log(token1 + '\n' + '\n' + '\n' +  token2)
    const user = new User({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpfValue,
      cro: req.body.croValue,
      telefone: req.body.telValue,  
      email: req.body.email,
      nascimento: req.body.dateValue,
      senha: bcrypt.hashSync(req.body.senha, 8),
      confirmationCode: token1,
      recoverPassword: token2,
      planos:{
        enum: [tokenGenerator(),tokenGenerator(),tokenGenerator() ]
      }
    });
    
   
    try {
      console.log(user)
        await user.save()
        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "5a5909a3b816cd",
              pass: "7d0f2637a8f7a3"
            }
          });
          transport.sendMail({
            from: "noreply@verication.mailtrap.com",
            to: user.email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
                <h2>Olá ${user.nome}</h2>
                <p>Obrigado por se cadastrar em nossa plataforma</p>
                <a href=http://localhost:3000/confirm/${user.confirmationCode}> Click aqui para completar seu cadastro</a>
                </div>`,
          }).catch(err=>console.log(err))
        res.status(200).json({message: "USÁRIO CADASTRADO COM SUCESSO"})
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({message:err.message})
    }
}  


async function emailVerfify (req, res, next){
    console.log(req.params.confirmationCode)
    User.findOne({
      confirmationCode: req.params.confirmationCode,
    })
      .then((user) => {
        console.log(user)
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        user.status = "Active";
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }else{
            res.status(200).json({message:"EMAIL CONFIRMADO!", status:"Active"})
          }
        });
      })
      .catch((e) => console.log("error", e));
  }

  async function recuperarSenha(req,res){
    const parametro = req.params.recoverPassword
    const user = await User.findOne({recoverPassword:parametro})
    if(user){
      res.json({message: 'true', id: user._id})
      console.log(user)
    }
    res.end()
  }

   async function trocarSenha(req,res){
     const senha = bcrypt.hashSync(req.body.senha, 8)
     const {id} = req.body
     console.log(id)
    const user = await User.updateOne({_id:id}, {senha:senha})
    console.log(user)
    if(user){
      res.json({message:'senha alterada com sucesso'})
    }else{
      res.json({message:'houve algum erro'})
    }
   }


  async function loginController(req, res, next){
    const email = req.body.email
    const senha = req.body.senha
    console.log('senha: ' + senha + 'email: ' + email)
    if(email === '' || senha === ''){
        return res.json({message: "POR FAVOR PREENCHA TODOS OS CAMPOS"})
    }
    const user = await User.findOne({email})
    if(!user || user === null || !bcrypt.compareSync(senha, user.senha)){
       return res.status(200).json({message: "EMAIL/SENHA INVÁLIDOS"})
    }
      if (user.status != "Active") {
          return res.status(200).json({
            message: "Conta não vericada, por favor verifique seu email",
          });
        
       }else{     
            var token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET, {expiresIn: 8400})
            res.json({token,plano: user.isPlano})
       }
}

async function verifyToken(req, res, next){
    let token = req.body.token;
    console.log(req.body)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
        if(err) return res.status(200).json({message:'unauthorized'})
        else return res.status(200).json({decoded, message:'authorized'})
    })
}

async function verifyPlano(req, res){
  let {token} = req.body
  console.log(token)
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
    if(err) return res.status(200).json({message:'unauthorized'})
    
    else{
      console.log(decoded.id)
      return res.status(200).json({decoded, message:'authorized'})
    }
    
})
  // if(id === '' || id === undefined || id === null){
  //   console.log('1')
  //   return res.status(500).send('Houve um erro')
  // }
  // const user = await User.findOne({_id:ObjectId(id)})
  // if(user){
  //   console.log(user)
  // }
  // else{
  //   console.log('Nenhum usuário encontrado')
  // }
  // res.json({isPlano: user.isPlano})
}

async function recuperarSenhaController(req,res){
  const {email} = req.body
  // var emailUpperCase = toUpperCase(email)
  const user = await User.findOne({email})
  if(!user || user === null){
   
    return res.status(200).json({message: "EMAIL NÃO CADASTRADO", value: false})
 }else{
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5a5909a3b816cd",
      pass: "7d0f2637a8f7a3"
    }
  });
  transport.sendMail({
    from: "noreply@trocadesenha.mailtrap.com",
    to: user.email,
    subject: "EMAIL PARA TROCA DE SENHA",
    html: `<h1>Troca de senha</h1>
        <h2>Olá ${user.nome}</h2>
        <p>Esse é o seu link para trocar de senha: </p>
        <a href=http://localhost:3000/recuperar/${user.recoverPassword}> https://smartdentarioback.herokuapp.com/recuperar/${user.recoverPassword}</a>
        </div>`,
  })
  res.status(200).json({message: `UM EMAIL PARA RECUPERAR A SENHA FOI ENVIADO PARA ${email}`, value: true})
 }
  
}
 async function planosVerify(req, res){
  var plano = req.body.plano
  var email = req.body.email
  console .log(plano + email)
  const check = await User.findOne({email})
  if(check){
    if(check.planos.enum[0] === plano){
      console.log('0')
      res.json({message:'Free'})
      return
    }
    if(check.planos.enum[1] === plano){
      console.log('1')

      res.json({message:'BÁSICO'})
      return
    }
    if(check.planos.enum[2] === plano){
      console.log('2')
      res.json({message:'PREMIUM'})
      return
    }
  }
  else{
    res.send('não foi encontrado nenhum usuario')
  }
 }




module.exports = {planosVerify,verifyPlano, registerController, emailVerfify, loginController, verifyToken, recuperarSenhaController, recuperarSenha, trocarSenha, registerEmailSenha}