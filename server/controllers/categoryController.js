import Category from "../models/Category.js";
import slugify from "../utils/slugify.js";

// ===============================
// CREATE CATEGORY
// ===============================
export const createCategory = async (req, res) => {
  try {
    const { name, description, image, displayOrder } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const slug = slugify(name);

    const exists = await Category.findOne({
      $or: [{ name }, { slug }],
      isDeleted: false,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists.",
      });
    }

    const category = await Category.create({
      name,
      slug,
      description,
      image,
      displayOrder,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL CATEGORIES
// ===============================
export const getCategories = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort || "displayOrder";

    const query = {
      isDeleted: false,
    };

    if (search) {
      query.$text = {
        $search: search,
      };
    }

    const totalCategories = await Category.countDocuments(query);

    const categories = await Category.find(query)
      .sort({ [sort]: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalCategories / limit),
      totalCategories,
      count: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE CATEGORY
// ===============================
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      isDeleted: false,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE CATEGORY
// ===============================
export const updateCategory = async (req, res) => {
  try {
    const { name, description, image, displayOrder, isActive } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category || category.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    if (name) {
      category.name = name;
      category.slug = slugify(name);
    }

    if (description !== undefined)
      category.description = description;

    if (image !== undefined)
      category.image = image;

    if (displayOrder !== undefined)
      category.displayOrder = displayOrder;

    if (isActive !== undefined)
      category.isActive = isActive;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// SOFT DELETE CATEGORY
// ===============================
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category || category.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    category.isDeleted = true;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// RESTORE CATEGORY
// ===============================
export const restoreCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    category.isDeleted = false;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category restored successfully.",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// TOGGLE ACTIVE / INACTIVE
// ===============================
export const toggleCategoryStatus = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category || category.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    category.isActive = !category.isActive;

    await category.save();

    return res.status(200).json({
      success: true,
      message: `Category ${
        category.isActive ? "activated" : "deactivated"
      } successfully.`,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};