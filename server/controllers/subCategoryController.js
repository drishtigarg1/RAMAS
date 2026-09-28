import SubCategory from "../models/SubCategory.js";
import Category from "../models/Category.js";
import slugify from "../utils/slugify.js";

// ===============================
// CREATE SUBCATEGORY
// ===============================
export const createSubCategory = async (req, res) => {
  try {
    const {
      category,
      name,
      description,
      image,
      displayOrder,
    } = req.body;

    if (!category || !name) {
      return res.status(400).json({
        success: false,
        message: "Category and SubCategory name are required.",
      });
    }

    const categoryExists = await Category.findById(category);

    if (!categoryExists || categoryExists.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Parent category not found.",
      });
    }

    const slug = slugify(name);

    const exists = await SubCategory.findOne({
      category,
      $or: [{ name }, { slug }],
      isDeleted: false,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "SubCategory already exists.",
      });
    }

    const subCategory = await SubCategory.create({
      category,
      name,
      slug,
      description,
      image,
      displayOrder,
    });

    return res.status(201).json({
      success: true,
      message: "SubCategory created successfully.",
      subCategory,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL SUBCATEGORIES
// ===============================
export const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({
      isDeleted: false,
    })
      .populate("category", "name slug")
      .sort({ displayOrder: 1 });

    return res.status(200).json({
      success: true,
      count: subCategories.length,
      subCategories,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE SUBCATEGORY
// ===============================
export const getSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findOne({
      slug: req.params.slug,
      isDeleted: false,
    }).populate("category", "name slug");

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found.",
      });
    }

    return res.status(200).json({
      success: true,
      subCategory,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE SUBCATEGORY
// ===============================
export const updateSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory || subCategory.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found.",
      });
    }

    const {
      name,
      description,
      image,
      displayOrder,
      isActive,
      category,
    } = req.body;

    if (name) {
      subCategory.name = name;
      subCategory.slug = slugify(name);
    }

    if (description !== undefined)
      subCategory.description = description;

    if (image !== undefined)
      subCategory.image = image;

    if (displayOrder !== undefined)
      subCategory.displayOrder = displayOrder;

    if (isActive !== undefined)
      subCategory.isActive = isActive;

    if (category !== undefined)
      subCategory.category = category;

    await subCategory.save();

    return res.status(200).json({
      success: true,
      message: "SubCategory updated successfully.",
      subCategory,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE SUBCATEGORY
// ===============================
export const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory || subCategory.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found.",
      });
    }

    subCategory.isDeleted = true;

    await subCategory.save();

    return res.status(200).json({
      success: true,
      message: "SubCategory deleted successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// RESTORE SUBCATEGORY
// ===============================
export const restoreSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found.",
      });
    }

    subCategory.isDeleted = false;

    await subCategory.save();

    return res.status(200).json({
      success: true,
      message: "SubCategory restored successfully.",
      subCategory,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// TOGGLE STATUS
// ===============================
export const toggleSubCategoryStatus = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory || subCategory.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found.",
      });
    }

    subCategory.isActive = !subCategory.isActive;

    await subCategory.save();

    return res.status(200).json({
      success: true,
      message: `SubCategory ${
        subCategory.isActive ? "activated" : "deactivated"
      } successfully.`,
      subCategory,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};