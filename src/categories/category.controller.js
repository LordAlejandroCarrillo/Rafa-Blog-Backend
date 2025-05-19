import { validateCategoryFields, validateIfFalse } from "../middlewares/validate-category.js"
import Category from "./category.model.js"

export const createCategory = async (req, res) => {
  try {
    await validateCategoryFields(req, res)
      if(res.headersSent) return
    const { name, color } = req.body
    const lowerCaseName = name.toLowerCase()
    const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

    const category = await Category.create({ 
      name: capitalizedName,
      color
    })

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding category.",
      error
    })
  }
}

export const getCategoryById = async (req, res) => {
  try {
    await validateIfFalse(req, res)
        if(res.headersSent) return
    const { id } = req.params
    const category = await Category.findById(id)
    res.status(200).json({
      success: true,
      message: "Category found successfully.",
      category,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obtaining category.",
      error,
    })
  }
}

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ state:true })
    res.status(200).json({
      success: true,
      message: "Category found successfully.",
      categories,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obtaining category.",
      error,
    })
  }
}