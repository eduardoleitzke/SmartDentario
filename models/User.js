const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nome:{type: String, required: true},
    sobrenome: {type: String, required: true},
    nascimento: {type: String, required: true},
    cpf: {type: String, required: true},
    cro: {type: String, required: true},
    telefone: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
    isPlano: {type: Boolean, default: false},
    status: {
      type: String, 
      enum: ['Pending', 'Active'],
      default: 'Pending',
      required: true
    },
    planosRemains:{type:Number, default:0},
    planos:{ enum:[]},
    currentPlano:{type:String, default:null},
     confirmationCode:{ 
      type: String, 
       unique: true },
     recoverPassword:{
      type: String,
      unique: true
     },
     creatAt:{type: Date, default: Date.now}     
})
const User = mongoose.model("User", userSchema)
module.exports = User