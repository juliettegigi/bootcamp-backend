const {pool,tablas}=require("../db_config");
const{usuarioRoles}=tablas;

/**
 * 
 * @param {number} id 
 * @returns {Promise<Object>|Error} Rol encontrado  o {}
 */
const create=async(usuarioId,rolId)=>{
    try{
        const [result]=await pool.query(`Insert into ??(usuarioId,rolId)
                                         values(?,?);`,
                                         [usuarioRoles,usuarioId,rolId]);
        console.log(`--------------------- result de create usuarioRol `)
        console.log(result)
        return result.insertId;  
    }catch(error){
        console.log(error)
        throw error
    }
}





module.exports={
   create
}