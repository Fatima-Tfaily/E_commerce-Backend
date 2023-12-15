require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const bodyParser = require("body-parser");
const cartsRoutes = require("./routes/CartsRoute");
const checkoutRoutes = require("./routes/CheckoutRoute");
const ordersRoutes = require("./routes/OrdersRoute");
const categoryRoutes = require("./routes/CategoryRoute");
const userRoutes = require("./routes/UserRoute");
const productRoutes = require("./routes/ProductsRoute");

const app = express();
const port = process.env.Port;

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded());

app.use("/categories", categoryRoutes);
app.use("/user", userRoutes);
app.use("/carts", cartsRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/orders", ordersRoutes);
app.use("/product", productRoutes);

app.listen(port, () => {
  dbConnection()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
  console.log(`Example app listening on port ${port}`);
});
