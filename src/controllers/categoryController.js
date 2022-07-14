
const CategoryService = require("../services/categoryService");

exports.obtenerCategorias = async (req, res) => {
    try{
        let categorias = await CategoryService.findCategories();
        return res.status(200).json({categorias,message: "Categorias encontradas con éxito"});
    }catch(err){
        console.log("Error: ", err)
        return res.status(400).json({message: "Error al obtener categorias"})
    }
}