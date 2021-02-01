const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const app = express();
let logger = require("morgan");
let bodyParser = require("body-parser");

//routes
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const orderRoutes = require("./routes/order");

let cors = require("cors");

//enviroment config
env.config();

//mongodb connection string
mongoose
  .connect(
    "mongodb+srv://owais:owaisdb@cluster0.enmcs.mongodb.net/auth?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("database connected");
  });

app.use(cors());
app.use(logger(`dev`));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: err });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
