import Subject from "../subjects/subject.model.js"
import Publication from "./publication.model.js"
import Category from "../categories/category.model.js"
import { 
  validateIfCategoryExists,
  validateIfFalse,
  validateIfSubjectExists,
  validatePublication,
  validatePublicationFields 
} from "../middlewares/validate-publication.js"

export const createPublication = async (req, res) => {
  try {
    await validatePublicationFields(req, res)
        if(res.headersSent) return
    await validateIfSubjectExists(req, res)
        if(res.headersSent) return
    await validateIfCategoryExists(req, res)
        if(res.headersSent) return

    const { title, description } = req.body
    const { subject, category } = req.params
    const lowerCaseName = subject.toLowerCase()
    const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + subject.slice(1).toLowerCase()
    const subjectRequested = await Subject.findOne({ name: capitalizedName, state:true})
    let categoryRequested = ''
    if(category){    
      const lowerCaseCategory = category.toLowerCase()
      const capitalizedCategory = lowerCaseCategory.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
      categoryRequested = await Category.findOne({ state: true, name: capitalizedCategory })
    }
    const date = new Date()
    const dateToIzo = date.toISOString()
    const currentDate = dateToIzo.replace('Z', '+00:00')
    let publication = ''
    console.log(categoryRequested.id)
    if(category){
        publication = await Publication.create({
        title: title,
        description: description,
        subjectRef: subjectRequested.id,
        subjectName: subjectRequested.name,
        date: currentDate,
        categoryRef: categoryRequested.id,
        categoryName: categoryRequested.name,
        categoryColor: categoryRequested.color
      })
    } else{
        publication = await Publication.create({
        title: title,
        description: description,
        subjectRef: subjectRequested.id,
        subjectName: subjectRequested.name,
        date: currentDate
      })
    }

    res.status(200).json({
      success: true,
      message: "Published successfully",
      publication,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error publishing",
      error
    })
  }
}

export const getPublications = async (req, res) => {
  try {
    await validateIfCategoryExists(req, res)
      if(res.headersSent) return
    await validateIfSubjectExists(req, res)
      if(res.headersSent) return
    await validatePublication(req, res)
      if(res.headersSent) return
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obtaining publications.sdaf   afasdf ",
      error,
    })
  }
}

export const getPublicationById = async (req, res) => {
  try {
    await validateIfFalse(req, res)
      if(res.headersSent) return
    const { id } = req.params
    const publication = await Publication.findById(id)

    res.status(200).json({
      success: true,
      message: "Publication found successfully.",
      publication,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obtaining publication.",
      error,
    })
  }
}


export const updatePublication = async (req, res) => {
  try {
    await validateIfSubjectExists(req, res)
      if(res.headersSent) return
    await validateIfFalse(req, res)
      if(res.headersSent) return

    const { title, description, subject } = req.body
    const { id } = req.params
    const lowerCaseName = subject.toLowerCase()
    const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + subject.slice(1).toLowerCase()
    const subjectRequested = await Subject.findOne({ name: capitalizedName, state:true})
    const fecha = new Date();
    const dateToIzo = fecha.toISOString();
    const currentDate = dateToIzo.replace('Z', '+00:00');
    const publication = await Publication.findByIdAndUpdate(id,{
        title: title,
        description: description,
        subjectRef: subjectRequested.id,
        subjectName: subjectRequested.name,
        lastUpdateDate: currentDate
    }, {new: true})

    res.status(200).json({
      success: true,
      message: "Publication updated successfully.",
      publication,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating publication.",
      error
    })
  }
}

export const deletePublication = async (req, res) => {
  try {
    await validateIfFalse(req, res)
      if(res.headersSent) return

    const { id } = req.params
    const publication = await Publication.findByIdAndUpdate(id,{ state:false }, {new: true})

    res.status(200).json({
      success: true,
      message: "Publication deleted successfully.",
      publication,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleted publication.",
      error
    })
  }
}