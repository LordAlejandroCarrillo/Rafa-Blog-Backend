import { 
  validateExistentName, 
  validateIfFalse, 
  validateSubjectFields 
} from "../middlewares/validate-subject.js"
import Subject from "./subject.model.js"

export const createSubject = async (req, res) => {
  try {
    await validateSubjectFields(req, res)
      if(res.headersSent) return
    await validateExistentName(req, res)
      if(res.headersSent) return

    const { name, imageURL } = req.body
    const lowerCaseName = name.toLowerCase()
    const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

    const subject = await Subject.create({ name:capitalizedName, imageURL })

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      subject,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding subject",
      error
    })
  }
}

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ state: true })
    res.status(200).json({
      success: true,
      message: "Subjects found successfully.",
      subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obtaining subjects.",
      error,
    })
  }
}

export const updateSubject = async (req, res) => {
  try {
    await validateExistentName(req, res) 
      if(res.headersSent) return
    await validateIfFalse(req, res)
      if(res.headersSent) return
    const { id } = req.params
    const { name, imageURL } = req.body
    const lowerCaseName = name.toLowerCase()
    const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    const updateSubject = await Subject.findByIdAndUpdate(id, { name:capitalizedName, imageURL }, {new: true})

    res.status(200).json({
      success: true,
      message: "Subject updated successfully.",
      updateSubject
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating subject.",
      error,
    })
  }
}

export const deleteSubject = async (req, res) => {
  try {
    await validateIfFalse(req, res)
      if(res.headersSent) return

    const { id } = req.params
    const updateSubject = await Subject.findByIdAndUpdate(id, { state:false }, {new: true})

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully.",
      updateSubject
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting the subject.",
      error,
    })
  }
}

export const getSubjectById = async (req, res) => {
  try {
    await validateIfFalse(req, res)
      if(res.headersSent) return
    const { id } = req.params
    const subject = await Subject.findById(id)

    res.status(200).json({
      success: true,
      message: "Subject found successfully.",
      subject,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obtaining subjects.",
      error,
    })
  }
}
