const Product = require("../models/products.model");

function _makeCriteria(query) {
  const { name, minPrice, maxPrice, inStock } = query;
  const criteria = {};
  if (name) {
    criteria.name = { $regex: new RegExp(name, 'i') }; // 'i' flag for case-insensitive
  }
 
  if (minPrice) {
    criteria.price = { ...criteria.price, $gte: minPrice };
  }
  
  if (maxPrice) {
    criteria.price = { ...criteria.price, $lte: maxPrice };
  }
  
  if (inStock) {
    criteria.quantity = inStock === "true" ? { $gt: 0 } : { $eq: 0 };
  }  
  return criteria;
}

async function getProducts(req, res) {
  const {query} = req
  const criteria = _makeCriteria(query) ;
  const page = query.page ;
  const limit = query.limit ;
  const skip = (page - 1) * limit;

  try {
    const productsCount = await Product.countDocuments(criteria).exec();

    const products = await Product.find(criteria).skip(skip).limit(limit).exec();


    // Respond with the filtered products and metadata
    res.status(200).json({
      productsCount:productsCount,
      products:products});
  } catch (error) {
    // Respond with a 500 status code and the error message in case of an error
    res.status(500).json({ message: error.message });
  }
}

async function getProductById(req, res) {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: error.message });
  }
}




async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: error.message });
  }
}

async function createProduct(req, res) {
  const newProduct = req.body;
  try {
    const tempProduct = new Product(newProduct);
    await tempProduct.save();
    res.status(201).json({ message: "Item added successfully", product: tempProduct });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function updateProduct(req, res) {
  const updatedProductData = req.body;
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Item updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the product", error: error.message });
  }
}


module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
