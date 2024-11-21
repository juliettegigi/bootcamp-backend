var express = require('express');
const { check } = require("express-validator");
const {login,logOut}=require('../controller/auth');
const { isAuth } = require('../middlewares/validaciones');
const { validarCampos } = require('../middlewares/validar-campos');
var router = express.Router();

/* GET home page. */
router.post('/',
            [   check('email','El email es obligatorio').notEmpty(),
                check('email','Email no  válido').isEmail(),
                check('pass','La contraseña es obligatoria').notEmpty(),
             //   check('pass','La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
                validarCampos], 
            login);


router.delete('/',[
               isAuth
              ], logOut);

module.exports = router;
