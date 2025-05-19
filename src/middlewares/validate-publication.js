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
    
}

export const validateIfCategoryExists = async (req, res) => {
    let { category } = req.params
    if (category != "null" && category){
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

export const validatePublication = async (req, res) => {
    const { subject, category, offset } = req.params
    const lowerCaseName = subject.toLowerCase()
    const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + subject.slice(1).toLowerCase()
    const lowerCaseCategory = category.toLowerCase()
    const capitalizedCategory = lowerCaseCategory.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    let categoryr
    let publications
    let total
    if (category != "null" && category){
        categoryr = await Category.findOne({name: capitalizedCategory})
    }

    if((category != "null" && category) && (subject != "null" && subject)){
        total = await Publication.countDocuments({ state: true, categoryRef: categoryr.id, subjectName: capitalizedName })
        publications = await Publication.find({ state: true, categoryRef: categoryr.id, subjectName: capitalizedName})
            .skip(offset)
            .limit(10)
    } else if(category != "null" && category){
        total = await Publication.countDocuments({ state: true, categoryRef: categoryr.id })
        publications = await Publication.find({ state: true, categoryRef: categoryr.id })
            .skip(offset)
            .limit(10)
    } else if(subject != "null" && subject){
        total = await Publication.countDocuments({ state: true, subjectName: capitalizedName })
        publications = await Publication.find({ state: true, subjectName: capitalizedName })
            .skip(offset)
            .limit(10)
    } else{
        total = await Publication.countDocuments({ state: true })
        publications = await Publication.find({ state: true })
            .skip(offset)
            .limit(10)
    }

    return res.status(200).json({
      total:total,
      success: true,
      message: "Publications found successfully.",
      publications,
    })
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

