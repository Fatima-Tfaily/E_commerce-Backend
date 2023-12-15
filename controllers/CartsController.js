const Carts = require("../models/Carts");

const getAllCarts = async (req, res) => {
  try {
    const data = await Carts.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(404).send("Internal Server Error");
  }
};

const addCarts = async (req, res) => {
  try {
    const cart = new Carts({
      user_id: req.body.user_id,
      products_id: req.body.products_id,
      quantity_to_purchase: req.body.quantity_to_purchase,
    });
    const savedCart = await cart.save();

    res.status(200).json({
      code: 200,
      message: "Cart added successfully",
      data: savedCart,
    });
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Cart not added successfully",
      error: err.message,
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await Carts.deleteOne({ cart_id: req.params.cart_id });
    res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
      cart: cart,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Error occured while deleted Cart",
      error: error,
    });
  }
};

module.exports = {
  getAllCarts,
  deleteCart,
  addCarts,
};
