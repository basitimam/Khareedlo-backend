const express = require("express");
const { addCategory, getCategories } = require("../controller/category");
const { requireSignin, adminMiddleware } = require("../common-middleware");

const router = express.Router();

router.post("/addcategory", requireSignin, adminMiddleware, addCategory);
router.get("/getcategory", getCategories);
// router.get("/getcategory", getCategories);

module.exports = router;
