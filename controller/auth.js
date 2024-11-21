const Usuario=require('../models/usuario')
const Rol=require('../models/rol')
const bcryptjs=require('bcryptjs');



const login=async(req,res)=>{
    try{
        const{email,pass}=req.body;
        const user=await Usuario.getUserByEmail(email)// a la password no la retorno
        //verificar si existe el email
        if(!user)
           return res.status(400).json({msg:"El correo ingresado no existe en nuestro registro."})
        const{pass:passRta,...usuario}=user;
        //email existe, ver si la pass coincide
        const validPassword=await bcryptjs.compare(pass,passRta);
            if(!validPassword){
                 return res.status(400).json({msg:"Pass incorrecta."})
            }
        // voy a enviar el rol del usuario
        const roles=(await Rol.getUserRols(usuario.id))
        // configurar la sesión para no autenticar en cada requerimiento
        req.session.usuario = user;
        req.session.roles=roles;
        return res.status(200).json({msg:"usuario y pass válidos",usuario,roles})    
    }catch(error){
        return res.status(500).json({error:error.message})
    }
    
}

    
const logOut=(req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ msg: 'Error al cerrar sesión' });
            }
            res.status(200).json({ msg: 'Sesión cerrada exitosamente' });
        });
}

module.exports={login,
                logOut
};