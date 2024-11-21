
const Rol=require('../models/rol')
const Usuario=require('../models/usuario')

const tieneRole=(...roles)=>{
  
    return (req,res,next)=>{
        const rols = req.session.roles;
        if(!roles.some(rol =>rols.some(objeto => objeto.rol === rol)))
          return res.status(403).json({msg:`El usuario no tiene el rol ${roles} necesario para acceder a la petición.`})
        next(); 
}
    
}


const isAuth=(req,res,next)=>{
  console.log("validoooooooooooo " , req.session.usuario)
        if(!req.session.usuario)
          return res.status(401).json({msg:`usuario no authenticado`})
       else next(); 
        }
    


const isRolValido=async(req,res,next)=>{
  const role=await Rol.getRolByRol(req.body.rol)
  if (!role){
      return res.status(400).json( {msg:'El rol es inválido'} );
  }
  
  else{ 
    req.body.rolId=role.id;
    next();
  }
}

const isUsuarioRegistrado=async(req,res,next)=>{
  const user=await Usuario.getUserByEmail(req.body.email);
        if(user){
            const rolRegistrado=await Rol.getUserRols(user.id);
            if(rolRegistrado.find(elem=>elem.rol===req.body.rol)){
                return res.status(400).json("Usuario ya registrado.")
            }
            req.body.usuarioId=user.id;
            req.body.existeEmail=true;
        }
        next();
}

module.exports={
    tieneRole,
    isAuth,
    isRolValido,
    isUsuarioRegistrado,
}