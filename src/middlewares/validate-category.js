import Category from "../categories/category.model.js"

export const validateCategoryFields = async (req, res) => {
    const { name, color } = req.body
    if(!name || !color){
        return res.status(400).json({
            success: false,
            message: "Some field(s) is|are empty."
        })
    }
}

export const validateIfFalse = async (req, res) => {
    const { id } = req.params
    const category = await Category.findById(id)
    if(!category.state){
        return res.status(400).json({
            success: false,
            message: "Category doesnt exist."
        })
    }
}