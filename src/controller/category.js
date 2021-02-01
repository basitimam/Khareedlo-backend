const Category = require("../models/category");
const slugify = require("slugify");

exports.addCategory = async (req, res) => {
  const { name } = req.body;

  await Category.findOne({ name: req.body.name }).exec((error, category) => {
    if (category) {
      return res.status(400).json({
        message: "Category already exists.",
      });
    }
  });

  const category = new Category({
    name,
  });

  try {
    await category.save((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) {
        res.status(201).json({ category });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getCategories = (req, res) => {
  Category.find({})
    .then(
      (categories) => {
        console.log(categories);
        res.json(categories);
      },
      (err) => {
        return res.status(400).json(err);
      }
    )
    .catch((err) => {
      return res.status(400).json(err);
    });
};
