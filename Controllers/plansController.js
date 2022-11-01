const express = require('express')
const User = require('../models/User')
const Planning = require('../models/Planning')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
module.exports =  async function createPlan(req, res, next) {
   let {nome, descricacao, invocator, age, procedimento} = req.body
   const planning = new Planning({
        procedure: procedimento,
        invocator,
        pacienteName: nome,
        age,
        description: descricacao,
        file: req.file
   })
   try{
    await planning.save()
    res.send(planning)
   }
   catch(err){
      console.log(req.file)
      if(req.file){
         fs.unlink(path.join(__dirname, '../' , `temp/uploads/${req.file.filename}`),  function (err) {
            if (err) throw err;
            console.log('File deleted!');
         
      })
      }
         
    return res.send(err.message)
   }
}


