//Ejercicio 4: En un archivo crud_example.js, escribe funciones asíncronas para crear, leer, actualizar y eliminar registros en la tabla users.
const {pool,tablas}=require("../db_config");
const{usuarios,participaciones,eventos}=tablas;


/**
 * 
 * @param {string} nombre
 * @param {string} email 
 * @param {string} pass 
 * @returns {Promise<number|Error>} return id del user creado
 */
const crearUser=async(nombre,email,pass)=>{
    try {
       const[result]= await pool.query(`Insert into ??(nombre,email,pass)
                          values(?,?,?);`,
                        [usuarios,nombre,email,pass]);
        console.log(`--------------------- result de INSERT INTO usuarios(nombre,email,pass) VALUES(${nombre},${email},${pass});`)
        console.log(result)
        return result.insertId;                
    } catch (error) {
        console.log(error);
        throw error;
    }
}
/**
 * 
 * @param {number} id 
 * @returns {Promise<Object|Error>} return un usuario
 */
const leerUserById=async(id)=>{
    try{
        const [result]=await pool.query(`SELECT *
                                     FROM ??
                                     WHERE id=?`,
                                     [usuarios,id])
        console.log(`--------------------- result de SELECT * FROM usuarios WHERE id=${id}`)
        console.log(result)                             
        if(result.length>0)                                 
          return result[0]
        return result
    }catch(error){
         console.log(error);
         throw(error)
    }
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
        console.log(`--------------------- result de UPDATE usuarios set nombre=${nombre}, email=${email}, pass=${pass} WHERE id=${id}`)
        console.log(result)
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
        console.log(`--------------------- result de DELETE FROM usuarios WHERE id=${id}`)
        console.log(result)
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
        console.log("--------------------- result de Select * from usuarios;")
        console.log(users)
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
        console.log("--------------------- result de select count(*) as total from usuarios")
        console.log(result)
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
        console.log(`--------------------- result de select * from ${usuarios} where email=${email} `)
        console.log(result)
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
                                            AND ( u.id=?  OR  u.nombre LIKE ?) 
                                        LIMIT ? OFFSET ?;`,  
                                            [participaciones,usuarios,eventos,eventoId,idOrName,`%${idOrName}%`,limit,offset])
        const [[{ total }]] =await pool.query(`SELECT COUNT(*) as total  
                                        FROM ?? p
                                        JOIN 
                                            ?? u ON p.usuarioId = u.id
                                        JOIN 
                                            ?? e ON p.eventoId = e.id
                                        WHERE 
                                            e.isEliminado=0
                                            AND e.id = ?
                                            AND ( u.id=?  OR  u.nombre LIKE ?) 
                                            ;`,  
                                            [participaciones,usuarios,eventos,eventoId,idOrName,`%${idOrName}%`])
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