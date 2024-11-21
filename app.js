const express=require("express");
const cors=require('cors');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const { isAuth } = require("./middlewares/validaciones");
//instancia de express
const app=express();
const PORT=3000;


//MIDDLEWARES
/* app.use(
    session({
      secret: 'PrrTutuPrrTutu',
      resave: false,
      saveUninitialized: false,
    })
  );
 */
  app.use(cors({ 
    origin: 'http://localhost:4200',
    credentials: true
   }));
 // app.use(cookieParser());
  app.use(session({
    secret: 'PrrTutuPrrTutu',
    resave: false,
    saveUninitialized:true,
    }));


app.use(express.json())//para parsear el body JSON a un objeto JS accesible en req.body

// ROUTES
app.use("/usuarios",require('./routes/user'))
app.use("/eventos"
  ,[isAuth] 
  ,require('./routes/evento'))
app.use("/auth",require('./routes/auth'))
app.use("/participaciones",[isAuth],require('./routes/participacion'))
app.use("/roles",require('./routes/rol'))



//SERVIDOR ESCUCHANDO EN EL PUERTO 3000
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/`)
})