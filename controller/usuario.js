const bcryptjs=require('bcryptjs');
const {pool}=require("../db_config");

const Usuario=require('../models/usuario')
const UsuarioRol=require('../models/usuariorol')


const getCantidadUsuarios=async(req,res)=>{
    
    try{
        //hacer la consulta
        const cantidad= await Usuario.getCantidadUsuarios()
        return res.json({msg:"en getcantidad",cantidad})
    }catch(error){
         console.log(error)
         return res.status(500).json({error:"error en get cantidad de usuarios.",error:error.message})
    }
}

const getAllUsers=async(req,res)=>{
    try {
        let usuarios=await Usuario.getAllUsers();
        usuarios=usuarios.map(usuario=>{
            const{pass,...rest}=usuario;
            return rest
        })
        return res.status(200).json({msg:"en getAll",usuarios})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"error en get todos los usuarios.",error:error.message})
    }
}


const getUsersConfirmados=async(req,res)=>{
    try{
        const {eventoId}=req.params;
        const{limit=5,offset=0}=req.query;
        let {registros,total}=await Usuario.getUsersConfirmados(eventoId,parseInt(limit),parseInt(offset));
        registros=registros.map(usuario=>{
            const{pass,...rest}=usuario;
            return rest})
        return res.status(200).json({registros,total})  
    }catch (error) {
        console.log(error)
        return res.status(500).json({msg:"error en getUsersConfirmados.",error:error.message})
    }
}

const getUsuariosPorEvento=async(req,res)=>{
    try{
        const {eventoId}=req.params;
        const{limit=5,offset=0}=req.query;
        let {registros,total}=await Usuario.getUsuariosPorEvento(eventoId,parseInt(limit),parseInt(offset));
        registros=registros.map(usuario=>{
            const{pass,...rest}=usuario;
            return rest})
        return res.status(200).json({registros,total})  
    }catch (error) {
        console.log(error)
        return res.status(500).json({msg:"error en getUsersConfirmados.",error:error.message})
    }
}


const getUsuariosPorEvento2=async(req,res)=>{
    try{
        const {eventoId,usuarioIdOrName}=req.params;
        const{limit=5,offset=0}=req.query;
        let {registros,total}=await Usuario.getUsuariosPorEvento2(usuarioIdOrName,eventoId,parseInt(limit),parseInt(offset));
        registros=registros.map(usuario=>{
            const{pass,...rest}=usuario;
            return rest})
        return res.status(200).json({registros,total})  
    }catch (error) {
        console.log(error)
        return res.status(500).json({msg:"error en getUsersConfirmados.",error:error.message})
    }
}


const crearUser=async(req,res)=>{
    try {
        const {nombre,email,pass,rol="USUARIO",existeEmail=false,rolId=0,usuarioId:idUser}=req.body;
        // Iniciar una transacción
        const connection = await pool.getConnection();
        await connection.beginTransaction();

         //si existe el email ==> tengo que agregar un registro en usuarioroles
         // existe el email y le agrego un nuevo rol
         if(existeEmail){
           const id= await UsuarioRol.create(idUser,rolId,connection)
           return res.status(201).json(idUser)
         }

         //encriptar la pass
         const salt=bcryptjs.genSaltSync();
         const passCifrada=bcryptjs.hashSync(pass,salt);
         
         //crear usuario
         const usuarioId=await Usuario.crearUser(nombre,email,passCifrada,connection)
         // settearle el rol
         await UsuarioRol.create(usuarioId,rolId,connection)
        return res.status(201).json(usuarioId)
    } catch (error) {
        console.log(error)
        await connection.rollback();
        return res.status(500).json(error.message)
    }
}

const leerUserById=async(req,res)=>{
    try {
        const{id}= req.params;
        const{pass,...usuario}=await Usuario.leerUserById(id)// a la password no la retorno
        if(Object.keys(usuario).length === 0)
            return res.status(400).json({msg:"Usuario not found"})
        return res.json({msg:"en getUserById",usuario})        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"error al leer user by id",error:error.message})
    }

}

const actualizarUser=async(req,res)=>{
    try {
        const{id}=req.params;
        const{nombre,email,pass}=req.body;

        const affectedRows=await Usuario.actualizarUser(id,nombre,email,pass)
        if(affectedRows>0)
           return res.json({msg:"Usuario actualizado."})
        else 
          return res.json({msg:"Usuario not found."})        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Error al actualizar al user.",error:error.message})
    }
}
   
const eliminarUser=async(req,res)=>{
    try {
        const {id}=req.params;
        if(await Usuario.eliminarUser(id)>0)
           return res.json({msg:"Usuario eliminado"})
        else return res.status(400).json({msg:"Usuario not found."})        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Error al eliminar al user.",error:error.message})
    }


}

module.exports={
   getCantidadUsuarios,
   getAllUsers,
   getUsersConfirmados,
   getUsuariosPorEvento,
   getUsuariosPorEvento2,
   crearUser,
   leerUserById,
   actualizarUser,
   eliminarUser
}