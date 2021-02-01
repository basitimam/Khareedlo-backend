const Product = require("../models/product");
const slugify = require("slugify");
const Category = require("../models/category");

exports.addProduct = async (req, res, next) => {
  //res.status(200).json( { file: req.files, body: req.body } );

  const {
    name,
    price,
    quantity,
    featured,
    category,
    imagePath,
    expiry,
  } = req.body;
  // let productPicture = [];

  // if (req.files.length > 0) {
  //   productPicture = req.files.map((file) => {
  //     return { img: file.filename };
  //   });
  // // }
  // console.log(price);

  await Product.findOne({ name: req.body.name }).exec(
    async (error, product) => {
      if (product) {
        return res.status(400).json({
          message:
            "Product already exists. Please update its quantity if you want.",
        });
      } else {
        const product = new Product({
          name,
          price,
          quantity,
          featured,
          category,
          imagePath,
          expiry,
        });

        try {
          await product.save((error, product) => {
            if (error) return res.status(400).json({ error });
            else {
              res.status(201).json(product);
            }
          });
        } catch (err) {
          res.status(400).send(err);
        }
      }
    }
  );
};

// exports.getProductsBySlug = (req, res, next) => {
//   const { slug } = req.params;
//   Category.findOne({ slug: slug })
//     .select("_id")
//     .exec((error, category) => {
//       if (error) {
//         return res.status(400).json({ error });
//       }

//       if (category) {
//         Product.find({ category: category._id }).exec((error, products) => {
//           if (error) {
//             return res.status(400).json({ error });
//           }

//           if (products.length > 0) {
//             res.status(200).json({
//               products,
//             });
//           }
//         });
//       }
//     });

//   next();
// };

exports.deleteProduct = (req, res, next) => {
  const id = req.body._id;
  Product.findOneAndDelete({ _id: id })
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

exports.getProducts = (req, res) => {
  Product.find({})
    .populate("category")
    .then(
      (products) => {
        console.log(products);
        res.json(products);
      },
      (err) => {
        return res.status(400).json(err);
      }
    )
    .catch((err) => {
      return res.status(400).json(err);
    });
};

// Product.find({})
//   .then(
//     (products) => {
//       console.log(products);
//       res.json(products);
//     },
//     (err) => {
//       return res.status(400).json(err);
//     }
//   )
//   .catch((err) => {
//     return res.status(400).json(err);
//   });

exports.updateProduct = async (req, res) => {
  const {
    _id,
    name,
    price,
    quantity,
    featured,
    category,
    imagePath,
    expiry,
  } = req.body;

  console.log(req.body);

  if (_id) {
    Product.findByIdAndUpdate(
      _id,
      {
        name,
        price,
        quantity,
        featured,
        category,
        imagePath,
        expiry,
      },
      { new: true },
      function (err, data) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(data);
        }
      }
    );
  } else {
    res.status(400).json("Cannot find id");
  }
};
