const Orders = require("../models/Orders");

const getAllOrders = async (req, res) => {
  try {
    const data = await Orders.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(404).send("Internal Server Error");
  }
};

const getAllOrdersByUserId = async (req, res) => {
  try {
    const orders = await Orders.findById(req.params.user_id);
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Unable to get orders by ID",
      error: error,
    });
  }
};

const addOrders = async (req, res) => {
  try {
    const order = new Orders({
      order_id: req.body.order_id,
      user_id: req.body.user_id,
      checkout_id: req.body.checkout_id,
      order_date: req.body.order_date,
      total_amount: req.body.total_amount,
      status: req.body.status,
    });
    const savedOrder = await order.save();

    res.status(200).json({
      code: 200,
      message: "Order added successfully",
      data: savedOrder,
    });
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Order not added successfully",
      error: err.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Orders.deleteOne({ order_id: req.params.order_id });
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      order: order,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Error occured while deleted Order",
      error: error,
    });
  }
};

module.exports = {
  getAllOrders,
  deleteOrder,
  addOrders,
  getAllOrdersByUserId,
};
