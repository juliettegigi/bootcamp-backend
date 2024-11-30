const {pool,tablas}=require("../db_config");
const{usuarioRoles}=tablas;

/**
 * 
 * @param {number} id 
 * @returns {Promise<Object>|Error} Rol encontrado  o {}
 */
const create=async(usuarioId,rolId,connection=null)=>{
    try{
        const [result]=await pool.query(`Insert into ??(usuarioId,rolId)
                                         values(?,?);`,
                                         [usuarioRoles,usuarioId,rolId]);
       
        await connection.commit();
        return result.insertId;  
    }catch(error){
        console.log(error)
        throw error
    }
}





module.exports={
   create
}