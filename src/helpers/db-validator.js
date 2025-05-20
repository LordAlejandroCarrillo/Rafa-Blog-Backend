import Category from "../categories/category.model.js";
import Comment from "../comments/comment.model.js";
import Publication from "../publications/publication.model.js";
import Subject from "../subjects/subject.model.js";

export const existenteEmail = async (email = '') =>{
    const existeEmail = await User.findOne({ email });

    if(existeEmail){
        throw new Error(`El email ${ email } ya existe en la base de datos`);
    }
}

export const existsSubjectById = async (id = '') => {
    const existsSubject = await Subject.findById(id);

    if(!existsSubject){
        throw new Error(`El ID ${id} no existe`);
    }
}

export const existsSubjectByName = async (subject = '') => {
    const lowerCaseName = subject.toLowerCase()
    const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + subject.slice(1).toLowerCase()
    const existsSubject = await Subject.findOne({name: capitalizedName})
    if(existsSubject == null){
        throw new Error(`The subject ${subject} doesnt exist.`)
    }
}

export const existsCategoryByName = async (category = '') => {
    const lowerCaseName = category.toLowerCase()
    const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    const existsCategory = await Category.findOne({name: capitalizedName})
    if(existsCategory == null){
        throw new Error(`The category ${category} doesnt exist.`)
    }
}

export const existsPublicationById = async (id = '') => {
    const existsPublication = await Publication.findById(id);

    if(!existsPublication){
        throw new Error(`El ID ${id} no existe`);
    }
}

export const existsCategoryById = async (id = '') => {
    const existsCategory = await Category.findById(id);

    if(!existsCategory){
        throw new Error(`El ID ${id} no existe`);
    }
}

export const existsCommentById = async (id = '') => {
    const existsComment = await Comment.findById(id);

    if(!existsComment){
        throw new Error(`El ID ${id} no existe`);
    }
}