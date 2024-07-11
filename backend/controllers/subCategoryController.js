import subCategoryModel from "../models/subCategoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import CategoryModel from "../models/categoryModel.js";
// @desc    Fetch all subCategory
// @route   GET /api/subCategory
// @access  Public

const getSubCategory = asyncHandler(async (req,res)=>{
    const SubCategory = await subCategoryModel.find({});
    res.status(200).json(SubCategory);
});

// @desc    Create New SubCategories
// @route   POST /api/subCategory
// @access  Admin
const createNewSubCategory = asyncHandler(async (req, res) => {
    try {
        const { categoryId, ...subCategoryData } = req.body;

        if (!categoryId) {
            return res.status(400).send("Category ID is required");
        }

        const newSubCategory = new subCategoryModel(subCategoryData);
        const savedSubCategory = await newSubCategory.save();

        await CategoryModel.updateOne(
            { _id: categoryId },
            { $push: { subCategories: savedSubCategory._id } }
        );

        res.status(200).send("SubCategory Has been Added");
    } catch (err) {
        res.status(500).send(err.message);
    }
});
export {getSubCategory,createNewSubCategory}