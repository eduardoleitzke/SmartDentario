const express = require("express")
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require("dotenv").config()


module.exports = async function selectedPlan(req,res){
    let {token, plano}= req.body
    console.log(plano)
    console.log(req.body)
    let id = null
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
        if(err){
            console.log(err)
           return  res.status(500).send(err)
        }
        else{
            return id = decoded.id
        }


    })
    const user = await User.findOne({_id:ObjectId(id)})
    if(plano === 'FREE'){
        user.isPlano = true
        user.currentPlano = user.planos.enum[0]
        user.planosRemains = 1
    }
    if(plano === 'BASICO'){
        user.isPlano = true
        user.currentPlano = user.planos.enum[1]
        user.planosRemains = 4
    }
    if(plano === 'PREMIUN'){
        user.isPlano = true
        user.currentPlano = user.planos.enum[2]
        user.planosRemains = 6
        
    }
    console.log(user)
    user.save()
    res.send('ok')
}


