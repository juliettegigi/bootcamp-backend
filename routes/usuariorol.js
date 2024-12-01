var express = require('express');
const { crearUsuarioRol } = require('../controller/usuariorol');

var router = express.Router();

router.post('/',[
            isAuth,
            tieneRole('ADMINISTRADOR'),
           ],
           crearUsuarioRol)

module.exports = router;
 