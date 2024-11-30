const {Router}=require("express");
const { check } = require("express-validator");
const {getUsersConfirmados,getCantidadUsuarios,getAllUsers,crearUser,leerUserById,actualizarUser,eliminarUser, getUsuariosPorEvento,getUsuariosPorEvento2}=require("../controller/usuario");
const { isAuth, isRolValido, isUsuarioRegistrado } = require("../middlewares/validaciones");
const { validarCampos } = require('../middlewares/validar-campos');


const router=Router();

router.get('/cantidad',[isAuth],getCantidadUsuarios); 
router.get('/all/:eventoId',[isAuth],getUsuariosPorEvento); 
router.get('/all2/:usuarioIdOrName/:eventoId',[isAuth],getUsuariosPorEvento2); 
router.get('/all',[isAuth],getAllUsers); 
router.get('/confirmados/:eventoId',[isAuth],getUsersConfirmados); 
router.get('/:id',[isAuth],leerUserById)
router.post('/', 
            [   isRolValido,
                check('email','El email es obligatorio').notEmpty(),
                check('email','Email no  válido').isEmail(),
                check('nombre','El nombre es obligatorio').notEmpty(),
                check('pass','La contraseña es obligatoria').notEmpty(),
                check('pass','La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
                validarCampos,
                isUsuarioRegistrado,
            ], 
            crearUser); 
router.put('/:id',[isAuth],actualizarUser); 
router.delete('/:id',[isAuth],eliminarUser)


module.exports=router;