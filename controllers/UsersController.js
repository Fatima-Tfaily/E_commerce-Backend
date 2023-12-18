const bcrypt = require("bcrypt");
const { generateToken } = require('../extra/generateToken');


const User = require("../models/users");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Get a User by ID
const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(500).send("Server Error");
  }
};
// Get an Admin User by ID
const getAdminByID = async (req, res) => {
  try {
    const adminUser = await User.findOne({ _id: req.params.id, role: "admin" });

    if (!adminUser) {
      return res.status(404).json({ msg: "Admin user not found" });
    }

    res.json(adminUser);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Admin user not found" });
    }

    res.status(500).send("Server Error");
  }
};

// Assuming your user model is defined as User
const getSellers = async (req, res) => {
  try {
    const users = await User.find({ role: "Seller" });
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(users);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(500).send("Server Error");
  }
};
// Assuming your user model is defined as User
const getAdmins = async (req, res) => {
  try {
    const users = await User.find({ role: "admin" });
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(users);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(500).send("Server Error");
  }
};

//Add Seller with password hashing
const addSeller = async (req, res) => {
  try {
    const role = "Seller";
    const { name, lastName, email, password, phoneNumber, address } = req.body;
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      lastName,
      email,
      hashedPassword, // Save the hashed password in the database
      phoneNumber,
      address,
      role,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
//Add User with password hashing
// const addUser = async (req, res) => {
//   try {
//     const role = "User";
//     const { name, lastName, email, password, phoneNumber, address } = req.body;
//     // Hash the password using bcrypt
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name,
//       lastName,
//       email,
//       hashedPassword, // Save the hashed password in the database
//       phoneNumber,
//       address,
//       role,
//     });
//     await newUser.save();
//     res.json(newUser);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

const addUser = async (req, res) => {


  try {
    const { name, lastName, email, password, phoneNumber, address } = req.body;
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      name,
      lastName,
      email,
      hashedPassword,
      phoneNumber,
      address,
    });
    // Save the user document to the MongoDB database
    await newUser.save();
    // Return success response with user data and token
    return res.status(200).json({
      success: true,
      message: "User added successfully.",
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error while trying to register a new user.`,
      error: error.message,
    });
  }
};



//Switch to Admin function
const switchToAdmin = async (req, res) => {
  const userId = req.params.id;

  try {
    // Update the user's role to 'admin'
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { role: "admin" } },
      { new: true }
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res
        .status(404)
        .json({ msg: `User with id = ${userId} not found.` });
    }

    return res.status(200).json({
      success: true,
      message: `User with id ${userId} switched to admin successfully.`,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: `Error while trying to update user with id ${userId}.`,
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: req.body.name,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          role: req.body.role,
        },
      },
      { new: true }
    );
    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete User",
      error: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User with email ${email} not found`,
      });
    }
    const checkPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Wrong password.",
      });
    }
    const token = generateToken(user);
    return res.status(200).json({
      success: true,
      message: `User with email ${email} logged in succesfully.`,
      data: token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to login.",
      error: error.message,
    });
  }
};

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find the user by email in MongoDB
//     const user = await User.findOne({ email });

//     // If user is not found
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: `User with email ${email} not found.`,
//       });
//     }

//     // Check the password using bcrypt
//     const checkPassword = await bcrypt.compare(password, user.password);

//     // If password is incorrect
//     if (!checkPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Wrong password.",
//       });
//     }

//     // If everything is correct, generate a token
//     const token = generateAuthToken(user._id);

//     // Return success response with user data and token
//     return res.status(200).json({
//       success: true,
//       message: `User with email ${email} logged in successfully.`,
//       data: {
//         ...user.toObject(),
//         token,
//       },
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: `Unable to login.`,
//       error: error.message,
//     });
//   }
// };

module.exports = {
  getAllUsers,
  getUserByID,
  addUser,
  deleteUser,
  updateUser,
  loginUser,
  switchToAdmin,
  getSellers,
  addSeller,
  getAdmins,
  getAdminByID,
};