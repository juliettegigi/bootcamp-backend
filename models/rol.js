const {pool,tablas}=require("../db_config");
const{usuarioRoles,roles,usuarios}=tablas;

/**
 * 
 * @param {number} id 
 * @returns {Promise<Object>|Error} Rol encontrado  o {}
 */
const getUserRols=async(usuarioId)=>{
    try{
        const [result]=await pool.query(`Select r.*
                                         FROM ?? ur
                                         Join ?? u on ur.usuarioId=u.id
                                         Join ?? r on ur.rolId=r.id
                                         WHERE usuarioId=?;`,
                                         [usuarioRoles,usuarios,roles,usuarioId])
        console.log(`--------------------- result d get userRoles by usuarioId`)
        console.log(result)
        return result;

    }catch(error){
        console.log(error)
        throw error
    }
}



/* 
const getRolByUsuarioId=async(usuarioId)=>{
    try{
        const [result]=await pool.query(`Select roles.*
                                         FROM ?? ur
                                         Join ?? u on ur.usuarioId=u.id
                                         Join ?? r on ur.rolId=r.id
                                         WHERE usuarioId=?;`,
                                         [usuarioRoles,usuarios,roles,usuarioId])
        console.log(`--------------------- result d get userRoles by usuarioId`)
        console.log(result)
        return result[0];

    }catch(error){
        console.log(error)
        throw error
    }
} */


const getRolByRol=async(rol)=>{
    try{
        const [result]=await pool.query(`select *
                                         from ??
                                         where rol=?;`,
                                         [roles,rol])
        console.log(`--------------------- result de getRolByRol `)
        console.log(result)
        return result[0];

    }catch(error){
        console.log(error)
        throw error
    }
}


module.exports={
    getUserRols,
    getRolByRol
}