const fs = require("fs");
const csv = require("csvtojson");
const {MongoClient} = require("mongodb");


const mongoDbUrl = process.env.MONGODB_URL;

const client = new MongoClient(mongoDbUrl)

const importProductsFromCSV = (req, res) => {
    console.log("importProductsFromCSV called of controller")
    const data = [];

    

    csv().fromFile(req.file.path)
        .then(async (response) => {
            // console.log("response is == ", response);
            for (item of response) {
                // console.log(response[x]);
                const productObject = {};
             
                productObject.name = item.name;
                
                productObject.category = item.category

                productObject.price = parseInt(item.price)

                productObject.stock = parseInt(item.stock)

                productObject.inStock = item.inStock;
                productObject.image = item.image;

                productObject.description = item.description
                
                data.push(productObject)
            }

            // console.log("data after manipulation is == ", data)

            
            const database = client.db("bulk-products");
            const products = database.collection("products");
            try {
                const result = await products.insertMany(data);
                                
                return res.status(200).json({message: "Products successfully uploaded to database"});
                // console.log(`${result.insertedCount} documents were inserted`);
            } catch (error) {
                return res.status(404).json({message: error.message});
                // console.log("error whiile saving to database", error);
            }


        })  

}

const getProducts = (req, res) => {
   return res.status(200).json(res.paginatedResult);
}


module.exports = { importProductsFromCSV, getProducts };