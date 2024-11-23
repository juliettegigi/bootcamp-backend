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






const eliminarParticipacion=async(req,res)=>{
    try {
        const {id}=req.params;
        if(await Participacion.eliminarParticipacion(id)>0)
           return res.json("Participación eliminada")
        else return res.status(400).json("Usuario not found.")        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }


}



const getParticipacionById=async(req,res)=>{
    try {
        const{id}= req.params;
        const{participacion}=await Participacion.getParticipacionById(id)
        if(participacion.length === 0)
            return res.status(400).json({msg:"Participacion not found"})
        return res.json(participacion)        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }

}





const generarPDF=async(req,res)=>{
 
   

  console.log(__dirname)
  console.log(path.join(__dirname,'/fonts/Roboto-Regular.ttf'))
  try  { 
    
    const evento=await Evento.getEventoById(req.params.eventoId)
    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    var fonts = {
        Roboto: {
            normal:path.join(__dirname,'/fonts/Roboto-Regular.ttf'),
            bold:path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
            italics:path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
            bolditalics: path.join(__dirname,'fonts/Roboto-MediumItalic.ttf')
        },

    };
    
    let pdfMake=new PdfMake(fonts);
    
   
const docDefinition = {
    content: [
      { text: 'CERTIFICADO DE PARTICIPACIÓN', style: 'header', alignment: 'center', margin: [0, 40, 0, 20] },
      { text: evento.nombre, style: 'subheader', alignment: 'center', margin: [0, 0, 0, 10] },
      {
        text: `Se otorga el presente certificado a: ${req.session.usuario.nombre}, por su participación en el evento realizado el día ${new Date(evento.fecha).toLocaleDateString('es-ES')} en ${evento.ubicacion}.`,
        margin: [0, 10, 0, 20],
      },
      {
        text: `Emitido el día: ${formattedDate}`,
        style: 'footer',
        alignment: 'right',
        margin: [0, 30, 0, 0],
      },
    ],
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 14, bold: true },
      footer: { fontSize: 10, italic: true },
    }, 
    defaultStyle: {
        font: 'Roboto', 
      },
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
    getParticipacionById,
    setPresenteToggle,
    setConfirmadoToggle,
    createParticipacion,
    eliminarParticipacion,
    isRegistrado,
    isConfirmado,
    generarPDF
}