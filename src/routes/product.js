const express = require("express");
//const {  } = require('../controller/category');
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  addProduct,
  getProductsBySlug,
  deleteProduct,
  getProducts,
  updateProduct,
} = require("../controller/product");

const router = express.Router();

router.post("/addproduct", requireSignin, adminMiddleware, addProduct);
router.post("/deleteproduct", requireSignin, adminMiddleware, deleteProduct);
router.get("/getproduct", getProducts);
router.put("/updateproduct", requireSignin, adminMiddleware, updateProduct);

module.exports = router;
