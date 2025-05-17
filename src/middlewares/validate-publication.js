import Category from "../categories/category.model.js"
import Publication from "../publications/publication.model.js"
import Subject from "../subjects/subject.model.js"

export const validatePublicationFields = async (req, res) => {
    const { title, description } = req.body
    if(!title || !description){
        return res.status(400).json({
            success: false,
            message: "Some field(s) is|are empty."
        })
    }
}

export const validateIfSubjectExists = async (req, res) => {
    const { subject } = req.params
    const lowerCaseName = subject.toLowerCase()
    const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + subject.slice(1).toLowerCase()
    const subjectRequested = await Subject.findOne({ name: capitalizedName, state:true})
    if(!subjectRequested){
        return res.status(400).json({
            success: false,
            message: "The subject doesnt exist or you misspelled it."
        })
    }
}

export const validateIfCategoryExists = async (req, res) => {
    let { category } = req.params
    if(category){
        const lowerCaseName = category.toLowerCase()
        const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
        const categoryRequested = await Category.findOne({ name: capitalizedName, state:true})
        if(!categoryRequested){
            return res.status(400).json({
                success: false,
                message: "The category doesnt exist or you misspelled it."
            })
        }
    }
}

export const validateIfFalse = async (req, res) => {
    const { id } = req.params
    const publication = await Publication.findById(id)
    if(!publication.state){
        return res.status(400).json({
            success: false,
            message: "Publication doesnt exist."
        })
    }
}

