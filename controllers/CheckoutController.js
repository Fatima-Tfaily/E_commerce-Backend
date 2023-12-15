const Checkout = require("../models/Checkout");

const getAllCheckout = async (_, res) => {
  try {
    const data = await Checkout.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(404).send("Internal Server Error");
  }
};

const deleteCheckout = async (req, res) => {
  try {
    const Checkout = await Checkout.deleteOne({
      checkout_id: req.params.checkout_id,
    });
    res.status(200).json({
      success: true,
      message: "Checkout deleted successfully",
      Checkout: Checkout,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Error occured while deleted Checkout",
      error: err,
    });
  }
};

const addCheckout = async (req, res) => {
  try {
    const checkout = new Checkout({
      checkout_id: req.body.checkout_id,
      user_id: req.body.user_id,
      products_id: req.body.products_id,
      quantity_to_purchase: req.body.quantity_to_purchase,
    });
    const savedCheckout = await checkout.save();

    res.status(200).json({
      code: 200,
      message: "Checkout added successfully",
      data: savedCheckout,
    });
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Checkout not added successfully",
      error: err.message,
    });
  }
};

module.exports = {
  getAllCheckout,
  deleteCheckout,
  addCheckout,
};
