import Brand from "../models/Brand.js";
import slugify from "../utils/slugify.js";

// ===============================
// CREATE BRAND
// ===============================
export const createBrand = async (req, res) => {
  try {
    const { name, description, logo, website } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Brand name is required.",
      });
    }

    const slug = slugify(name);

    const exists = await Brand.findOne({
      $or: [{ name }, { slug }],
      isDeleted: false,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Brand already exists.",
      });
    }

    const brand = await Brand.create({
      name,
      slug,
      description,
      logo,
      website,
    });

    return res.status(201).json({
      success: true,
      message: "Brand created successfully.",
      brand,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL BRANDS
// ===============================
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({
      isDeleted: false,
    }).sort({
      name: 1,
    });

    return res.status(200).json({
      success: true,
      count: brands.length,
      brands,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE BRAND
// ===============================
export const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findOne({
      slug: req.params.slug,
      isDeleted: false,
    });

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found.",
      });
    }

    return res.status(200).json({
      success: true,
      brand,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE BRAND
// ===============================
export const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand || brand.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Brand not found.",
      });
    }

    const {
      name,
      description,
      logo,
      website,
      isActive,
    } = req.body;

    if (name) {
      brand.name = name;
      brand.slug = slugify(name);
    }

    if (description !== undefined)
      brand.description = description;

    if (logo !== undefined)
      brand.logo = logo;

    if (website !== undefined)
      brand.website = website;

    if (isActive !== undefined)
      brand.isActive = isActive;

    await brand.save();

    return res.status(200).json({
      success: true,
      message: "Brand updated successfully.",
      brand,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE BRAND
// ===============================
export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand || brand.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Brand not found.",
      });
    }

    brand.isDeleted = true;

    await brand.save();

    return res.status(200).json({
      success: true,
      message: "Brand deleted successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// RESTORE BRAND
// ===============================
export const restoreBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found.",
      });
    }

    brand.isDeleted = false;

    await brand.save();

    return res.status(200).json({
      success: true,
      message: "Brand restored successfully.",
      brand,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// TOGGLE BRAND STATUS
// ===============================
export const toggleBrandStatus = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand || brand.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Brand not found.",
      });
    }

    brand.isActive = !brand.isActive;

    await brand.save();

    return res.status(200).json({
      success: true,
      message: `Brand ${
        brand.isActive ? "activated" : "deactivated"
      } successfully.`,
      brand,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};