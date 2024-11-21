const { format, isSameDay } = require('date-fns')
const Participacion=require('../models/participacion')
const Evento=require('../models/evento')
/* para el PDF */
//var PdfPrinter = require('../src/printer');
const path = require('path');
const fs = require('fs');
const PdfMake=require('pdfmake')

const setPresenteToggle=async(req,res)=>{
    try {
       
        const {usuarioId,eventoId}=req.params;
        const evento=await Evento.getEventoById(eventoId);

        const fechaActual = new Date();
        const fechaEvento = new Date(evento.fecha);
        
        if (!isSameDay(fechaActual, fechaEvento)) {
            return res.status(400).json("no se puede poner presente a un evento no actual.") 
        } 

        const affectedRows=await Participacion.setPresenteToggle(usuarioId,eventoId);
        if(affectedRows>0)
           return res.json("ok")
        else 
          return res.json("usuario o evento not found.")        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}



const setConfirmadoToggle=async(req,res)=>{
    try {
       
        const {participacionId}=req.params;

        const affectedRows=await Participacion.setConfirmadoToggle(participacionId);
        if(affectedRows>0)
           return res.json("ok")
        else 
          return res.json("participacion not found.")        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}


const createParticipacion=async(req,res)=>{
    try {
        const {usuarioId,eventoId}=req.body;
        
        const participacionId=await Participacion.createParticipacion(usuarioId,eventoId) 
        return res.status(201).json(participacionId)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error al crear evento.",error:error.message})
    }
}


const isRegistrado=async(req,res)=>{
    try {
        const {eventoId,usuarioId}=req.params;
        return res.status(200).json(await Participacion.isRegistrado(usuarioId,eventoId))
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}

const isConfirmado=async(req,res)=>{
    try {
        const {participacionId}=req.params;
        return res.status(200).json(await Participacion.isConfirmado(participacionId))
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}





const generarPDF=(req,res)=>{
 
  console.log(__dirname)
  console.log(path.join(__dirname,'/fonts/Roboto-Regular.ttf'))
  try  {  var fonts = {
        Roboto: {
            normal:path.join(__dirname,'/fonts/Roboto-Regular.ttf'),
            bold:path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
            italics:path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
            bolditalics: path.join(__dirname,'fonts/Roboto-MediumItalic.ttf')
        }
    };
    
    let pdfMake=new PdfMake(fonts);
    
    var docDefinition = {
        content: [
            'First paragraph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        ]
    };
    
    var pdfDoc = pdfMake.createPdfKitDocument(docDefinition,{});
   // pdfDoc.pipe(fs.createWriteStream(__dirname+'/basics.pdf'));
   res.setHeader('Content-Disposition', 'attachment; filename="basics.pdf"');
   res.setHeader('Content-Type', 'application/pdf');
   pdfDoc.pipe(res);
    pdfDoc.end();
} catch(error){
    console.log("ERROR")
    console.log(error)
}
 

}




module.exports={
    setPresenteToggle,
    setConfirmadoToggle,
    createParticipacion,
    isRegistrado,
    isConfirmado,
    generarPDF
}