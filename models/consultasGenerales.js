
const {pool}=require("../db_config");

const eliminarById=async(id,tabla)=>{
    try {
        const [result]=await pool.query(`delete from ?? 
                                         where id=?`,
                                        [tabla,id]);
        return result.affectedRows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



const getById=async(id,tabla)=>{
    try{
        const [result]=await pool.query(`SELECT *
                                     FROM ??
                                     WHERE id=?`,
                                     [tabla,id])                         
        if(result.length>0)                                 
          return result[0]  //un registro
        return result  //arreglo vacio
    }catch(error){
         console.log(error);
         throw(error)
    }
}

const is=async(condicion,arreglo)=>{
    try {
        const [resultado] = await pool.query(`
                                              SELECT id
                                              FROM ?? 
                                              ${condicion}
                                
                                            ;`, 
                                            arreglo
                                        );
        console.log(resultado)
       
          return (resultado.length===0)?0:resultado[0].id;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports={
    getById,
    eliminarById,
    is
}