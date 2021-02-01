const { body } = require("express-validator");
const Order = require("../models/order");
const Product = require("../models/product");

exports.addOrder = async (req, res, next) => {
  const { items, user, price } = req.body;

  //   console.log(req.body);

  const order = new Order({
    items,
    user,
    price,
  });

  try {
    await order.save(async (error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        res.status(200).json(order);
      }

      //Decreasing the count of product in Product Model
      for (let i = 0; i < items.length; i++) {
        const doc = await Product.findOne({ _id: items[i].product });
        let quantity = doc.quantity - items[i].quantity;
        doc.quantity = quantity;
        doc.overwrite(doc);
        await doc.save();
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

// exports.getOrderbyUser = async (req, res, next) => {
//   const { _id } = req.body;

//   Order.find({ user: { $eq: _id } })
//     .then(
//       (orders) => res.json(orders),
//       (err) => {
//         return res.status(400).json(err);
//       }
//     )
//     .catch((err) => {
//       return res.status(400).json(err);
//     });
// };

exports.getOrders = async (req, res, next) => {
  Order.find({})
    .populate("user")
    .populate({
      path: "items",
      populate: {
        path: "product",
      },
    })
    .populate({
      path: "items",
      populate: {
        path: "product",
        populate: {
          path: "category",
        },
      },
    })
    .then(
      (orders) => res.json(orders),
      (err) => {
        return res.status(400).json(err);
      }
    )
    .catch((err) => {
      return res.status(400).json(err);
    });
};

exports.deleteOrder = (req, res, next) => {
  const id = req.body._id;

  console.log(id);
  Order.findOneAndDelete({ _id: id })
    .then((deletedDocument) => {
      if (deletedDocument) {
        console.log(
          `Successfully deleted document that had the form: ${deletedDocument}.`
        );
        res.status(200).json({ message: "successfully deleted" });
      } else {
        console.log("No document matches the provided query.");
        res
          .status(400)
          .json({ message: "No document matches the provided query" });
      }
    })
    .catch((err) => {
      console.error(`Failed to find and delete document: ${err}`);
      res
        .status(400)
        .json({ message: "No document matches the provided query" });
    });
};
