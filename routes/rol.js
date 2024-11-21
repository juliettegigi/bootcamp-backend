var express = require('express');
const { getUserRols } = require('../models/rol');

var router = express.Router();

router.get('/:usuarioId',async(req,res)=>{
  try{  const roles=await getUserRols(req.params.usuarioId)
    return res.json(roles)}
    catch(error){
        return res.json(error.message)
    }
})

module.exports = router;
 