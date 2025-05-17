import Subject from "../subjects/subject.model.js"

export const validateExistentName = async (req, res) => {
    const { name } = req.body
    const lowerCaseName = name.toLowerCase()
    const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    const subject = await Subject.findOne({ name:capitalizedName })
    console.log(subject)
    if(subject){
        return res.status(400).json({
            success: false,
            message: "The name of the subject has been taken already"
        })
    }
}

export const validateSubjectFields = async (req, res) => {
    const { name, imageURL } = req.body
    if(!name || !imageURL){
        return res.status(400).json({
            success: false,
            message: "Some field(s) is|are empty."
        })
    }
}

export const validateIfFalse = async (req, res) => {
    const { id } = req.params
    const subject = await Subject.findById(id)
    if(!subject.state){
        return res.status(400).json({
            success: false,
            message: "Subject doesnt exist."
        })
    }
}

