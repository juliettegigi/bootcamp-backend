

const {pool,tablas}=require("../db_config");
const { eliminarById, getById,is } = require("./consultasGenerales");
const{participaciones}=tablas;

const setPresenteToggle=async(usuarioId,eventoId)=>{
    try{
        const [result]=await pool.query(`UPDATE ??
                                         SET isPresente = isPresente ^ 1 
                                         WHERE usuarioId=? AND eventoId=?`,
                                         [participaciones,usuarioId,eventoId]);
        return result.affectedRows;  
    }catch(error){
        console.log(error)
        throw error
    }
}

const setConfirmadoToggle=async(participacionId)=>{
    try{
        const [result]=await pool.query(`UPDATE ??
                                         SET isConfirmado = isConfirmado ^ 1 
                                         WHERE id=?`,
                                         [participaciones,participacionId]);
        return result.affectedRows;  
    }catch(error){
        console.log(error)
        throw error
    }
}


const createParticipacion=async(usuarioId,eventoId)=>{
    try {
        const[result]= await pool.query(`Insert into ??(usuarioId,eventoId)
                           values(?,?);`,
                         [participaciones,usuarioId,eventoId]);
         return result.insertId;                
     } catch (error) {
         console.log(error);
         throw error;
     }
}







const isConfirmado=async(participacionId)=>{
 return is(' WHERE id=? AND isConfirmado=1',
    [participaciones,parseInt(participacionId)]);
}

const isPresente=async(participacionId)=>{
    return is(' WHERE id=? AND isPresente=1',
        [participaciones,parseInt(participacionId)]);
}
const isRegistrado=async(usuarioId,eventoId)=>{
 return is(' WHERE usuarioId=? AND eventoId=?',
    [participaciones,parseInt(usuarioId),parseInt(eventoId)])
}





const eliminarParticipacion=async(id)=>{
  return eliminarById(id,participaciones)
}

getParticipacionById=async(id)=>{
   return getById(id,participaciones)
}


module.exports={
    createParticipacion,
    isConfirmado,
    isRegistrado,
    isPresente,
    setPresenteToggle,
    setConfirmadoToggle,
    eliminarParticipacion,
    getParticipacionById
}