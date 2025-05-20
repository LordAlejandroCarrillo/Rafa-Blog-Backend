import { 
  validateCommentFields, 
  validateIfCommentFalse, 
  validateIfPublicationFalse
} from "../middlewares/validate-comment.js"
import Publication from "../publications/publication.model.js"
import Comment from "./comment.model.js"

export const createComment = async (req, res) => {
  try {
    await validateCommentFields(req, res)
      if(res.headersSent) return
    await validateIfPublicationFalse(req, res)
      if(res.headersSent) return

    const { id } = req.params
    const { username, text } = req.body

    const date = new Date()
    const dateToIzo = date.toISOString()
    const currentDate = dateToIzo.replace('Z', '+00:00')
    const publication = await Publication.findById(id)

    const comment = await Comment.create({ 
      username,
      text,
      publicationRef: publication.id,
      date: currentDate
    })

    res.status(201).json({
      success: true,
      message: "Comment created successfully.",
      comment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding comment.",
      error
    })
  }
}

export const getComments = async (req, res) => {
  try {
    await validateIfPublicationFalse(req, res)
        if(res.headersSent) return
    const { id } = req.params
    const comments = await Comment.find({ state: true, publicationRef: id })
    res.status(200).json({
      success: true,
      message: "Comments found successfully.",
      comments,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obtaining comments.",
      error,
    })
  }
}

export const updateComment = async (req, res) => {
  try {
    await validateCommentFields(req, res)
      if(res.headersSent) return
    await validateIfCommentFalse(req, res)
      if(res.headersSent) return
    const { id } = req.params
    const { username, text } = req.body

    const date = new Date()
    const dateToIzo = date.toISOString()
    const currentDate = dateToIzo.replace('Z', '+00:00')

    const comment = await Comment.findByIdAndUpdate(id,
      { 
      username,
      text,
      date: currentDate
    },{new:true})

    return res.status(201).json({
      success: true,
      message: "Comment updated successfully.",
      comment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating comment.",
      error
    })
  }
}

export const deleteComment = async (req, res) => {
  try {
    await validateIfCommentFalse(req, res)
      if(res.headersSent) return
      console.log('hola')
    const { id } = req.params
    const comment = await Comment.findByIdAndUpdate(id, { state:false }, {new:true})

    return res.status(201).json({
      success: true,
      message: "Comment updated successfully.",
      comment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating comment.",
      error
    })
  }
}