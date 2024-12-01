const UsuarioRol=require('../models/usuariorol')

const crearUsuarioRol=async(req,res)=>{
  
    try {
        const{usuarioId,rolId}=req.body;
        const id=await UsuarioRol.create(usuarioId,rolId) 
        return res.status(201).json(id)
   
    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message)
    }
}


module.exports={
    crearUsuarioRol
}