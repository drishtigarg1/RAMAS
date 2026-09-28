import Product from "../models/Product.js";
import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";

// @desc    Fetch all products with filtering, sorting, pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 12;
    const page = Number(req.query.page) || 1;
    
    // Filtering
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    // Resolve slugs to ObjectIds if passed
    let categoryFilter = {};
    if (req.query.category) {
      // If it's a valid object ID, use it, else lookup by slug
      if (req.query.category.match(/^[0-9a-fA-F]{24}$/)) {
        categoryFilter = { category: req.query.category };
      } else {
        const cat = await Category.findOne({ slug: req.query.category });
        if (cat) categoryFilter = { category: cat._id };
      }
    }

    let subCategoryFilter = {};
    if (req.query.subCategory) {
      if (req.query.subCategory.match(/^[0-9a-fA-F]{24}$/)) {
        subCategoryFilter = { subCategory: req.query.subCategory };
      } else {
        const subCat = await SubCategory.findOne({ slug: req.query.subCategory });
        if (subCat) subCategoryFilter = { subCategory: subCat._id };
      }
    }

    const brand = req.query.brand ? { brand: req.query.brand } : {};
    
    // Price range
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : Number.MAX_SAFE_INTEGER;
    const priceFilter = { price: { $gte: minPrice, $lte: maxPrice } };

    const filter = { ...keyword, ...categoryFilter, ...subCategoryFilter, ...brand, ...priceFilter };

    // Sorting
    let sort = {};
    if (req.query.sortBy) {
      if (req.query.sortBy === "price_asc") sort = { price: 1 };
      else if (req.query.sortBy === "price_desc") sort = { price: -1 };
      else if (req.query.sortBy === "newest") sort = { createdAt: -1 };
      else if (req.query.sortBy === "rating") sort = { ratings: -1 };
    } else {
      sort = { createdAt: -1 }; // default sort
    }

    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate("category", "name slug")
      .populate("subCategory", "name slug")
      .populate("brand", "name slug")
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Fetch single product by ID or Slug
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const isId = req.params.id.match(/^[0-9a-fA-F]{24}$/);
    const product = isId 
      ? await Product.findById(req.params.id).populate("category", "name slug").populate("subCategory", "name slug").populate("brand", "name slug")
      : await Product.findOne({ slug: req.params.id }).populate("category", "name slug").populate("subCategory", "name slug").populate("brand", "name slug");

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, originalPrice, countInStock, images, category, subCategory, brand } = req.body;

    const product = new Product({
      name,
      description,
      price,
      originalPrice,
      countInStock,
      images: images || [],
      category: category || null,
      subCategory: subCategory || null,
      brand: brand || null,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, originalPrice, countInStock, images, category, subCategory, brand } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price !== undefined ? price : product.price;
      product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
      product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
      
      // Update ObjectIds safely
      product.category = category || product.category;
      product.subCategory = subCategory || product.subCategory;
      product.brand = brand || product.brand;

      // Update images only if provided
      if (images && images.length > 0) {
        product.images = images;
      }
      
      if (category) product.category = category;
      if (subCategory) product.subCategory = subCategory;
      if (brand) product.brand = brand;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
