const {Router}=require("express");
const {getEventosPag,getTotalEventos,crearEvento,getEventosByUsuarioIsPresente,borrarEventoLogico, editarEvento,getEventosProximos, getEventoById, getEventoByIdOrName}=require("../controller/evento");
const { tieneRole } = require("../middlewares/validaciones");


const router=Router();

//http://localhost:3000/eventos/pag?limit=5&offset=0
router.get('/pag',getEventosPag);
router.get('/total',getTotalEventos);
router.get('/proximos',getEventosProximos);
router.get('/idNombre/:idNom',getEventoByIdOrName);
router.get('/usuarioPresente/:usuarioId',getEventosByUsuarioIsPresente);
router.get('/:id',getEventoById);
router.post('/',[
            tieneRole(['ORGANIZADOR'])
            ], crearEvento ); 
router.put('/:id',[
            tieneRole(['ORGANIZADOR'])
            ],editarEvento); 
router.put('/borrar/:id',[
            tieneRole(['ORGANIZADOR'])
            ],borrarEventoLogico); 

module.exports=router;