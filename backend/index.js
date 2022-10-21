require("dotenv").config();
const express = require("express");
const productsRoute = require("./routes/products.route");
const app = express();
const PORT = 8082;
const cors = require("cors");
app.use(express.json());
const mongoose = require('mongoose');


// enable cors
// connect your app to mongodb

const mongoDbUrl = process.env.MONGODB_URL;
mongoose
  .connect(mongoDbUrl, { useNewUrlParser: true })
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => console.log(err))

app.use(cors());
app.options("*", cors());

app.use("/products", productsRoute);
app.listen(PORT, () => {
    console.log("listening on port == ", PORT);
})