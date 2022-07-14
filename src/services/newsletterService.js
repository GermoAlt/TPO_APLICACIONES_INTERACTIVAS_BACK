const Newsletter = require('../models/newsletterModel');

exports.addNewsletter = async (email) => {
    try{
        let newsletter = new Newsletter({"email": email});
        let savedNewsletter = await newsletter.save();
        return savedNewsletter;
    }catch(err){
        throw Error("Error al crear newsletter");
    }
}

exports.findNewsletters = async () => {
    try{
        let newsletters = Newsletter.find({});
        return newsletters;
    }
    catch(err){
        throw Error("Error al obtener newsletters");
    }
}