const {pool,tablas}=require("../db_config");
const{eventos}=tablas;


/**
 * 
 * @param {number} limit 
 * @param {number} offset 
 * @returns {Promise<Array<Object>} arreglo de eventos
 */
const getEventosPag=async(limit,offset)=>{
    try {
       const[registros]= await pool.query(`Select *
                                        FROM ??
                                        WHERE isEliminado=0
                                        LIMIT ?
                                        OFFSET ?;`,
                        [eventos,limit,offset]);

        //calculo el total
        const totalQuery = `SELECT COUNT(*) as total
                                        FROM ??
                                        WHERE isEliminado=0`;
       console.log("TOTAL QUERY  ",totalQuery)
       const [[{ total }]] = await pool.query(totalQuery, [eventos]);
        return {registros,total};                
    } catch (error) {
        console.log(error);
        throw error;
    }
}



/**
 * 
 * @returns {number} total de eventos en la DB
 */
const getTotalEventos = async () => {
    try {
        const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total 
                                                FROM ??
                                                WHERE isEliminado=0;
                                                `, [eventos]);
        return total;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



const crearEvento=async(nombre,fecha,ubicacion,descripcion)=>{
    try {
       const[result]= await pool.query(`Insert into ??(nombre,fecha,ubicacion,descripcion)
                          values(?,?,?,?);`,
                        [eventos,nombre,fecha,ubicacion,descripcion]);
        console.log(`--------------------- result de INSERT INTO eventos`)
        console.log(result)
        return result.insertId;                
    } catch (error) {
        console.log(error);
        throw error;
    }
}



const borrarEventoLogico=async(id)=>{
    try {console.log("entrodddddddddddddddddddddddddddddddddddd  ",id)
       const[result]= await pool.query(`UPDATE ??
                                        SET isEliminado=1
                                        WHERE id=?;`,
                        [eventos,id]);
        console.log(`--------------------- result de borrarEventoLogico`)
        console.log(result)
        return result.affectedRows;                
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const editarEvento=async(id,nombre,fecha,ubicacion,descripcion)=>{
    try {
       const [result]=await pool.query(`Update ??
                         set  nombre=?,fecha=?,ubicacion=?,descripcion=?
                         where id=?;`,
                       [eventos,nombre,fecha,ubicacion,descripcion,id]);
       console.log(`--------------------- result de UPDATE eventos `)
       console.log(result)
       return result.affectedRows;

    } catch (error) {
       console.log(error);
       throw error;
    }
}

const getEventoById=async(id)=>{
    try{
        const [result]=await pool.query(`SELECT *
                                     FROM ??
                                     WHERE id=? and isEliminado=0`,
                                     [eventos,id])
        console.log(`--------------------- result de get evento by id`)
        console.log(result)                             
        if(result.length>0)                                 
          return result[0]
        return result
    }catch(error){
         console.log(error);
         throw(error)
    }
}


const getEventoByIdOrName = async (idOrName,limit=1,offset=0) => {
    try {
      let query = `SELECT * FROM ?? WHERE isEliminado = 0`;
      let condicional=''
      let valor=idOrName;
      condicional=` AND (id = ? OR nombre LIKE ?)`
     
      // total de registros sin paginar
       const totalQuery = `SELECT COUNT(*) as total  
                           FROM ?? 
                           WHERE isEliminado=0 AND (id = ? OR nombre LIKE ?)`;
       console.log("TOTAL QUERY  ",totalQuery)
       const [[{ total }]] = await pool.query(totalQuery, [eventos,idOrName,`%${idOrName}%`]);
       
       //todos los registros paginados
       
      query+=` AND (id = ? OR nombre LIKE ?) 
               limit ? 
               offset ?;`
      const [registros] = await pool.query(query, [eventos,idOrName,`%${idOrName}%`,limit,offset]);
      console.log(`--------------------- eventos of getEventoByIdOrName`);
      console.log(registros,total);
  
      return {registros,total};
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  const getEventosProximos = async (limit=1,offset=0) => {
    try {
      let query = `SELECT *
                   FROM ?? 
                   WHERE isEliminado = 0 
                         AND fecha >= NOW() 
                   ORDER BY fecha ASC 
                   LIMIT ? 
                   OFFSET ?;
                    `;
     
      const [registros] = await pool.query(query, [eventos,limit,offset]);


      query = `SELECT COUNT(*) as total
               FROM ?? 
               WHERE isEliminado = 0 
                     AND fecha >= NOW() ;
                    `;
      const [[{ total }]] = await pool.query(query, [eventos]);

      console.log(registros,total);
  
      return {registros,total};
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getEventosByUsuarioIsPresente=async(usuarioId,limit, offset)=>{
    try{
      let query = `SELECT e.*
                 FROM participaciones p
                 INNER JOIN usuarios u ON u.id=p.usuarioId
                 INNER JOIN eventos e ON e.id=p.eventoId
                 WHERE isPresente=1 AND usuarioId=?
                 ORDER BY fecha ASC 
                 LIMIT ? 
                 OFFSET ?;
                  `;
      const [registros] = await pool.query(query, [usuarioId,limit,offset]);
      
      query = `SELECT COUNT(*) as total
               FROM participaciones p
               INNER JOIN usuarios u ON u.id=p.usuarioId
               INNER JOIN eventos e ON e.id=p.eventoId
               WHERE isPresente=1 AND usuarioId=?
                      `;
        const [[{ total }]] = await pool.query(query, [usuarioId]);
  
        console.log(registros,total);
    
        return {registros,total};
     
      } catch (error) {
      console.log(error);
      throw error;
    }

  }


module.exports={
    getEventoById,
   getEventosPag,
   getTotalEventos,
   getEventosProximos,
   crearEvento,
   borrarEventoLogico,
   editarEvento,
   getEventoByIdOrName,
   getEventosByUsuarioIsPresente
}