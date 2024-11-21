const mysql=require('mysql2')

//creo el pool de conexiones a la DB, q sea una promesa
const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"gestion_eventos"
}).promise();


module.exports={
    pool,
    tablas:{
        usuarios:"usuarios",
        usuarioRoles:"usuarioRoles",
        roles:"roles",
        participaciones:"participaciones",
        eventos:"eventos"
    }
}