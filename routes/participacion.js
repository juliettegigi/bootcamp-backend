var express = require('express');
const { check } = require("express-validator");
const { setPresenteToggle, createParticipacion,isRegistrado,setConfirmadoToggle,isConfirmado, generarPDF, eliminarParticipacion } = require('../controller/participacion');
const{ tieneRole,isUserEventoEnParticipacion,isParticipacionDelUsuario,noPresente}=require('../middlewares/validaciones');
const { validarCampos } = require('../middlewares/validar-campos');
var router = express.Router();

/* GET home page. */
router.put('/setPresenteToggle/:usuarioId/:eventoId',[
            tieneRole('ORGANIZADOR'),
            check('eventoId').isInt().withMessage('El eventoId debe ser un número entero'),
            check('usuarioId').isInt().withMessage('El usuarioId debe ser un número entero'),
            validarCampos,
            ],
           setPresenteToggle)
           //todo  no se puede confirmar una participacion de otro usuario
router.put('/setConfirmadoToggle/:participacionId',[
            check('participacionId').isInt().withMessage('participacionId debe ser un número entero'),
            validarCampos,
            isParticipacionDelUsuario,
            ],setConfirmadoToggle)
router.get('/isRegistrado/:usuarioId/:eventoId',[
            check('eventoId').isInt().withMessage('El eventoId debe ser un número entero'),
            check('usuarioId').isInt().withMessage('El usuarioId debe ser un número entero'),
            validarCampos,
            ],isRegistrado)
router.get('/isConfirmado/:participacionId',[
           check('participacionId').isInt().withMessage('participacionId debe ser un número entero'),
           validarCampos,           
           ],isConfirmado)
router.get('/pdf/:eventoId',[
            check('eventoId').isInt().withMessage('El eventoId debe ser un número entero'),
            validarCampos,
            isUserEventoEnParticipacion,
            ],generarPDF)
router.delete('/:participacionId',[
               check('participacionId').isInt().withMessage('El id debe ser un número entero'),
               validarCampos,
               isParticipacionDelUsuario,
               noPresente
               ],eliminarParticipacion)
router.post('/',createParticipacion)

module.exports = router;
 