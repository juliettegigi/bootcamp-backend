
const Rol=require('../models/rol')
const Usuario=require('../models/usuario')
const Participacion=require('../models/participacion')

const tieneRole=(...roles)=>{
  
    return (req,res,next)=>{
        const rols = req.session.roles;
        console.log('------------------------------------------------');
        console.log(roles);
        console.log(rols);
        if(!roles.some(rol =>rols.some(objeto => objeto.rol === rol)))
          return res.status(403).json({msg:`El usuario no tiene el rol ${roles} necesario para acceder a la petición.`})
        next(); 
}
    
}


const isAuth=(req,res,next)=>{

        if(!req.session.usuario)
          return res.status(401).json({msg:`usuario no autenticado`})
       else next(); 
        }
    


const isRolValido=async(req,res,next)=>{
  try{
    const role=await Rol.getRolByRol(req.body.rol)
    if (!role){
        return res.status(400).json( {msg:'El rol es inválido'} );
    }

    else{ 
      req.body.rolId=role.id;
      next();
    }}catch(error){
      return res.status(500).json( error.message );
    }
}

const isUsuarioRegistrado=async(req,res,next)=>{

  try{const user=await Usuario.getUserByEmail(req.body.email);
        if(user){
            const rolRegistrado=await Rol.getUserRols(user.id);
            if(rolRegistrado.find(elem=>elem.rol===req.body.rol)){
                return res.status(400).json("Usuario ya registrado.")
            }
            req.body.usuarioId=user.id;
            req.body.existeEmail=true;
        }
        next();}catch(error){
          return res.status(500).json( error.message );
        }
}


const isUserEventoEnParticipacion=async(req,res,next)=>{
  try{
    const {eventoId}=req.params 
    if(!(await Participacion.isRegistrado(req.session.usuario.id,eventoId))){
        return res.status(400).json('El usuario no ha participado del evento.')
    }
    next();
  }catch(error){
    return res.status(500).json(error.message)
  }
}


const isParticipacionDelUsuario=async(req,res,next)=>{
  try{
    const {id}=req.params 
    const participacion=await Participacion.getParticipacionById(id);
    if(participacion.length===0){
        return res.status(400).json('participación not foud')
    }
    if(participacion.usuarioId!==req.session.usuario.id){
      return res.status(400).json('no se puede eliminar la participación de otro usuario')
    }
    next();
  }catch(error){
    return res.status(500).json(error.message)
  }
}

const noPresente=async(req,res,next)=>{
  try{
    const {id}=req.params 
    if(await Participacion.isPresente(id)){
        return res.status(400).json('No se puede eliminar una participación que se presenció')
    }
    next();
  }catch(error){
    return res.status(500).json(error.message)
  }
}



const validateOwnership = (getResourceFn, resourceKey) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const resource = await getResourceFn(id);

      if (!resource) {
        return res.status(404).json({ message: `${resourceKey} no encontrado` });
      }

      if (resource.usuarioId !== req.user.id) {
        return res.status(403).json({ message: `No tienes permiso para modificar este ${resourceKey}` });
      }

      req[resourceKey] = resource; // Opcional, para que esté disponible más adelante
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};


module.exports={
    tieneRole,
    isAuth,
    isRolValido,
    isUsuarioRegistrado,
    isUserEventoEnParticipacion,
    isParticipacionDelUsuario,
    noPresente
}