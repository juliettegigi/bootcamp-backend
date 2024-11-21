var express = require('express');
const { setPresenteToggle, createParticipacion,isRegistrado,setConfirmadoToggle,isConfirmado, generarPDF } = require('../controller/participacion');
const{tieneRol, tieneRole}=require('../middlewares/validaciones')
var router = express.Router();

/* GET home page. */
router.put('/setPresenteToggle/:usuarioId/:eventoId',[
            tieneRole('ORGANIZADOR')
            ],
           setPresenteToggle)
router.put('/setConfirmadoToggle/:participacionId',setConfirmadoToggle)
router.get('/isRegistrado/:usuarioId/:eventoId',isRegistrado)
router.get('/isConfirmado/:participacionId',isConfirmado)
router.get('/pdf',generarPDF)
router.post('/',createParticipacion)

module.exports = router;
 