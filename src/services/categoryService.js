const Categoria = require('../models/categoriaModel');

exports.findCategories = async () => {
    try{
        let categorias = await Categoria.find({});
        return categorias;
    }catch(err){
        throw Error("Error al intentar buscar categorias");
    }
}