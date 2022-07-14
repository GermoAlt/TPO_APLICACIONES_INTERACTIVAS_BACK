const NewsletterService = require('../services/newsletterService');

exports.subscribeToNewsletter = async (req,res) => {
    try{
        let newsletter = await NewsletterService.addNewsletter(req.body.email)
        return res.status(200).json({newsletter,message:"Suscrito al newsletter con éxito"});
    }catch(err){
        console.log("Error: ", err);
        return res.status(400).json({message: "Error al subscribirse al newsletter: " + err})
    }
}

exports.getNewsletters = async (req,res) => {
    try{
        let newsletters = await NewsletterService.findNewsletters();
        return res.status(200).json({newsletters,message:"Newsletters recuperados con éxito"});
    }catch(err){
        console.log("Error: ", err);
        return res.status(400).json({message: "Error al recuperar newsletters: " + err})
    }
}