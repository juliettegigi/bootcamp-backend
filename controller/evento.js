const { isValid, parse } = require('date-fns');
const Evento=require('../models/evento')


const getEventosPag=async(req,res)=>{
    try {
        // en url voy a recibir tipo "localhost:8083/api/eventos?limit=2&desde=4"
        const {limit=5,offset=0}=req.query;
        const{registros,total}=await Evento.getEventosPag(parseInt(limit),parseInt(offset));
        //let eventos=await Evento.getEventosPag(limit,offset);
        return res.status(200).json({registros,total})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}

const getTotalEventos=async(req,res)=>{
    try {
        return res.status(200).json(await Evento.getTotalEventos())
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}


const crearEvento=async(req,res)=>{
    try {
        const {nombre,fecha,ubicacion,descripcion}=req.body;
         //validaciones
        //TODO:no se podría crear un evento con la misma fecha y ubicación
        const fechaIngresada = new Date(fecha);    
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);
        // no se puede crear un evento con una fecha anterior a la actual
        if (fechaIngresada < fechaActual) {
            return res.status(400).json({ msg: 'La fecha del evento no puede ser menor a la actual' });
        }

         const eventoId=await Evento.crearEvento(nombre,fecha,ubicacion,descripcion)
         
        return res.status(201).json({msg:"evento agregado a la DB",eventoId})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error al crear evento.",error:error.message})
    }
}

const borrarEventoLogico=async(req,res)=>{
    try {
        const{id}=req.params;
      
        const affectedRows=await Evento.borrarEventoLogico(id);
        if(affectedRows>0)
           return res.json("Evento eliminado.")
        else 
          return res.status(404).json("Evento not found.")        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message})
    }
}

const editarEvento=async(req,res)=>{
    try {
        const{id}=req.params;
        const{nombre,fecha,ubicacion,descripcion}=req.body;
        //VALIDACIÓN DE LA FECHA
        const fechaIngresada = new Date(fecha);    
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);
        // no se puede crear un evento con una fecha anterior a la actual
        if (fechaIngresada < fechaActual) {
            return res.status(400).json( 'La fecha del evento no puede ser menor a la actual');
        }

        const affectedRows=await Evento.editarEvento(id,nombre,fecha,ubicacion,descripcion)
        if(affectedRows>0)
           return res.json("Evento actualizado.")
        else 
          return res.json("Evento not found.")        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Error al actualizar evento.",error:error.message})
    }
}


const getEventoById=async(req,res)=>{
    try {
        const{id}= req.params;
        const evento=await Evento.getEventoById(id)
        if(evento.length === 0)
            return res.status(400).json("Evento not found")
        return res.json(evento)        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"error get evento by id",error:error.message})
    }

}


const getEventoByIdOrName=async(req,res)=>{
    try {
        let{idNom}= req.params;
        let{limit=1,offset=0}= req.query;
        const {registros,total}=await Evento.getEventoByIdOrName(idNom,parseInt(limit),parseInt(offset))
        if(registros.length === 0)
            return res.status(400).json("Evento not found")
        return res.json({registros,total})        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"error getEventoByIdOrName",error:error.message})
    }

}

const getEventosProximos=async(req,res)=>{
    try {
        let{limit=1,offset=0}= req.query;
        const {registros,total}=await Evento.getEventosProximos(parseInt(limit),parseInt(offset))
        if(registros.length === 0)
            return res.status(400).json("Evento not found")
        return res.json({registros,total})        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"error getEventosProximos",error:error.message})
    }

}


const getEventosByUsuarioIsPresente=async(req,res)=>{
    try {
        let {usuarioId}=req.params
        let{limit=1,offset=0}= req.query;
        const {registros,total}=await Evento.getEventosByUsuarioIsPresente(usuarioId,parseInt(limit),parseInt(offset))
        if(registros.length === 0)
            return res.status(400).json("Evento not found")
        return res.json({registros,total})        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"error getEventosProximos",error:error.message})
    }
}


module.exports={
    getEventosPag,
    getTotalEventos,
    getEventoByIdOrName,
    getEventoById,
    getEventosProximos,
    crearEvento,
    borrarEventoLogico,
    editarEvento,
    getEventosByUsuarioIsPresente
}