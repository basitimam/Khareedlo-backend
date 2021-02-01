const express = require("express");
//const {  } = require('../controller/category');
const {
  requireSignin,
  adminMiddleware,
  verifyuser,
} = require("../common-middleware");
const { getOrders, deleteOrder, addOrder } = require("../controller/order");

const router = express.Router();

//Please add requiresignin middleware for private routes
router.post("/addorder", requireSignin, addOrder);
router.get("/getorders", requireSignin, adminMiddleware, getOrders);
router.post("/deleteorder", requireSignin, adminMiddleware, deleteOrder);
//router.post("/deleteorder", requireSignin, adminMiddleware, deleteorder);

module.exports = router;
