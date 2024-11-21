# adjunté la base de datos que usé 


# RUTAS para probar el CRUD  con ejemplos de Body 


# RUTA POST + body
http://localhost:3000/users/
{
    "nombre":"fede",
    "email":"fede@gmail.com",
    "pass":"123"
}


# RUTA GET  cantidad de usuarios
http://localhost:3000/users/cantidad



# RUTA GET  todos los usuarios
http://localhost:3000/users/all


# RUTA GET  usuario por id
http://localhost:3000/users/8


# RUTA PUT
http://localhost:3000/users/1
{
    "nombre": "julia",
    "email": "julia@gmail.com",
    "pass":"123"
}




# RUTA DELETE borrar por id
http://localhost:3000/users/10