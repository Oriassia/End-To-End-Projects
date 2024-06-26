const express = require("express");

const {
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getProducts
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id",updateProduct)


module.exports = router;
