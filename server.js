require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const bodyParser = require("body-parser");
const cartsRoutes = require("./routes/CartsRoute");
const checkoutRoutes = require("./routes/CheckoutRoute");
const ordersRoutes = require("./routes/OrdersRoute");

const app = express();
const port = process.env.Port;

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded());

app.use("/carts", cartsRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/orders", ordersRoutes);

app.listen(port, () => {
  dbConnection()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
  console.log(`Example app listening on port ${port}`);
});
