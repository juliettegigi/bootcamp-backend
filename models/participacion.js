

const {pool,tablas}=require("../db_config");
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


const isRegistrado=async(usuarioId,eventoId)=>{
    try {
        const [resultado] = await pool.query(`
                                              SELECT id
                                              FROM ?? 
                                              WHERE usuarioId=? AND eventoId=?
                                            ;`, 
                                            [participaciones,parseInt(usuarioId),parseInt(eventoId)]
                                        );
        console.log(resultado)
       
          return (resultado.length===0)?0:resultado[0].id;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const isConfirmado=async(participacionId)=>{
    try {
        const [resultado] = await pool.query(`
                                              SELECT id
                                              FROM ?? 
                                              WHERE id=? AND isConfirmado=1
                                
                                            ;`, 
                                            [participaciones,parseInt(participacionId)]
                                        );
        console.log(resultado)
       
          return (resultado.length===0)?0:resultado[0].id;
    } catch (error) {
        console.log(error);
        throw error;
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



module.exports={
    createParticipacion,
    isRegistrado,
    setPresenteToggle,
    setConfirmadoToggle,
    isConfirmado
}