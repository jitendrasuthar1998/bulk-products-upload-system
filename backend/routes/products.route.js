const { importProductsFromCSV, getProducts } = require("../controllers/products.controller");

const router = require("express").Router();
const paginatedResult = require("../middleware/pagination");
const Product = require("../models/ProductModel");
// router.get("/products", );

const multer = require("multer");

const upload = multer({ dest: 'tmp/csv/' });

router.post("/csv",upload.single('file'),importProductsFromCSV)

router.get("/", paginatedResult(Product), getProducts)



module.exports = router;