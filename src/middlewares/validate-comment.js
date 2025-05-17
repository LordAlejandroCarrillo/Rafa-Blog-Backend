import Comment from "../comments/comment.model.js"
import Publication from "../publications/publication.model.js"

export const validateCommentFields = async (req, res) => {
    const { username, text } = req.body
    if(!username || !text ){
        return res.status(400).json({
            success: false,
            message: "Some field(s) is|are empty."
        })
    }
}

export const validateIfCommentFalse = async (req, res) => {
    const { id } = req.params
    const comment = await Comment.findById(id)
    if(!comment.state){
        return res.status(400).json({
            success: false,
            message: "Comment doesnt exist."
        })
    }
}

export const validateIfPublicationFalse = async (req, res) => {
    const { id } = req.params
    const publication = await Publication.findById(id)
    if(!publication.state){
        return res.status(400).json({
            success: false,
            message: "Publication doesnt exist."
        })
    }
}
