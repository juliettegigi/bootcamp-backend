//Ejercicio 4: En un archivo crud_example.js, escribe funciones asíncronas para crear, leer, actualizar y eliminar registros en la tabla users.
const {pool,tablas}=require("../db_config");
const { getById } = require("./consultasGenerales");
const{usuarios,participaciones,eventos}=tablas;


/**
 * 
 * @param {string} nombre
 * @param {string} email 
 * @param {string} pass 
 * @returns {Promise<number|Error>} return id del user creado
 */
const crearUser=async(nombre,email,pass,connection=null)=>{
    try {
       const[result]= await pool.query(`Insert into ??(nombre,email,pass)
                          values(?,?,?);`,
                        [usuarios,nombre,email,pass]);
       
        if(connection)
            await connection.commit();
        return result.insertId;                
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const leerUserById=async(id)=>{
    return getById(id,usuarios);
}
/**
 * 
 * @param {number} id 
* @param {string} nombre
 * @param {string} email 
 * @param {string} pass 
 * @returns {Promise<number|Error>}
 */
const actualizarUser=async(id,nombre,email,pass)=>{
     try {
        const [result]=await pool.query(`Update ??
                          set nombre=? , email=?, pass=?
                          where id=?;`,
                        [usuarios,nombre,email,pass,id]);
       
        return result.affectedRows;

     } catch (error) {
        console.log(error);
        throw error;
     }
}

/**
 * 
 * @param {number} id 
 * @returns {Promise<number>} cantidad de filas afectadas
 */
const eliminarUser=async(id)=>{
    try {
        const [result]=await pool.query(`delete from ?? 
                                         where id=?`,
                                        [usuarios,id]);
       
        return result.affectedRows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


/**
 * 
 * @returns {Promise<Array<Object>} arreglo de usuarios
 */
const getAllUsers=async()=>{
    try{//pool.query retorna un arreglo con 2 elementos:
        //1)el resultado de la consulta, un array
        //2) un objeto
        const [users]=await pool.query(`Select *
                                           FROM ??;`,[usuarios]);
       
        return users;
    } catch(error){
        console.log(error);
        throw error;
    }
     
}

/**
 * 
 * @returns {Promise<number>} cantidad de usuarios en la DB
 */
const getCantidadUsuarios=async()=>{
    try {
        const [result]=await pool.query(`Select count(*) as total
                          from ??;`,[usuarios])
        
        return result[0].total
    } catch (error) {
        console.log(error)
        throw error
    }
}

/**
 * 
 * @param {string} email 
 * @returns {Promise<Object>|Error} usuario encontrado  o {}
 */
const getUserByEmail=async(email)=>{
    try{
        const [result]=await pool.query(`Select * 
                                         FROM ??
                                         WHERE email=?;`,
                                         [usuarios,email])
        
        return result[0];

    }catch(error){
        console.log(error)
        throw error
    }
}


const getUsersConfirmados=async(eventoId,limit=5, offset=0)=>{
    try{
        
        const [registros]=await pool.query(`SELECT u.id ,
                                                u.nombre,
                                                u.email 
                                        FROM ?? p
                                        JOIN 
                                            ?? u ON p.usuarioId = u.id
                                        JOIN 
                                            ?? e ON p.eventoId = e.id
                                        WHERE 
                                            p.isConfirmado = 1
                                            AND e.isEliminado=0
                                            AND e.id = ?
                                        LIMIT ? OFFSET ?;`,  
                                            [participaciones,usuarios,eventos,eventoId,limit,offset])



        const [[{ total }]] =await pool.query(`SELECT COUNT(*) as total  
                                        FROM ?? p
                                        JOIN 
                                            ?? u ON p.usuarioId = u.id
                                        JOIN 
                                            ?? e ON p.eventoId = e.id
                                        WHERE 
                                            p.isConfirmado = 1
                                            AND e.isEliminado=0
                                            AND e.id = ?
                                            ;`,  
                                            [participaciones,usuarios,eventos,eventoId])
        return {registros,total}
    }
    catch(error){
        console.log(error)
        throw error
    }
}


const getUsuariosPorEvento=async(eventoId,limit=5, offset=0)=>{
    try{
        
        const [registros]=await pool.query(`SELECT u.id ,
                                                u.nombre,
                                                u.email,
                                                p.isPresente,
                                                p.isConfirmado 
                                        FROM ?? p
                                        JOIN 
                                            ?? u ON p.usuarioId = u.id
                                        JOIN 
                                            ?? e ON p.eventoId = e.id
                                        WHERE 
                                            e.isEliminado=0
                                            AND e.id = ?
                                        LIMIT ? OFFSET ?;`,  
                                            [participaciones,usuarios,eventos,eventoId,limit,offset])
        const [[{ total }]] =await pool.query(`SELECT COUNT(*) as total  
                                        FROM ?? p
                                        JOIN 
                                            ?? u ON p.usuarioId = u.id
                                        JOIN 
                                            ?? e ON p.eventoId = e.id
                                        WHERE 
                                            e.isEliminado=0
                                            AND e.id = ?;`,  
                                            [participaciones,usuarios,eventos,eventoId])
        return {registros,total}
    }
    catch(error){
        console.log(error)
        throw error
    }
}


// busca por id, nombre del user y evento
const getUsuariosPorEvento2=async(idOrName,eventoId,limit=5, offset=0)=>{
    try{
        
        const [registros]=await pool.query(`SELECT u.id ,
                                                u.nombre,
                                                u.email,
                                                p.isPresente,
                                                p.isConfirmado 
                                        FROM ?? p
                                        JOIN 
                                            ?? u ON p.usuarioId = u.id
                                        JOIN 
                                            ?? e ON p.eventoId = e.id
                                        WHERE 
                                            e.isEliminado=0
                                            AND e.id = ?
                                            AND ( u.id=?  OR  u.nombre LIKE ? OR u.email LIKE ?) 
                                        LIMIT ? OFFSET ?;`,  
                                            [participaciones,usuarios,eventos,eventoId,idOrName,`%${idOrName}%`,`%${idOrName}%`,limit,offset])
        const [[{ total }]] =await pool.query(`SELECT COUNT(*) as total  
                                        FROM ?? p
                                        JOIN 
                                            ?? u ON p.usuarioId = u.id
                                        JOIN 
                                            ?? e ON p.eventoId = e.id
                                        WHERE 
                                            e.isEliminado=0
                                            AND e.id = ?
                                            AND ( u.id=?  OR  u.nombre LIKE ?  OR u.email LIKE ?) 
                                            ;`,  
                                            [participaciones,usuarios,eventos,eventoId,idOrName,`%${idOrName}%`,`%${idOrName}%`])
        return {registros,total}
    }
    catch(error){
        console.log(error)
        throw error
    }
}



module.exports={
    crearUser,
    leerUserById,
    actualizarUser,
    eliminarUser,
    getAllUsers,
    getCantidadUsuarios,
    getUserByEmail,
    getUsersConfirmados,
    getUsuariosPorEvento,
    getUsuariosPorEvento2
}