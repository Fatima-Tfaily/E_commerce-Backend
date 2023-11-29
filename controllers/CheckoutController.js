const Checkout = require("../models/Checkout ");

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
    const Checkout = await Checkout.deleteOne({ checkout_id: req.params.checkout_id });
    res.status(200).json({
      success: true,
      message: "Checkout deleted successfully",
      Checkout: Checkout,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Error occured while deleted Checkout",
      error: error,
    });
  }
};

module.exports = {
  getAllCheckout,
  deleteCheckout,
 
};
