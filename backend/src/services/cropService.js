const User = require("../models/User");

const Crop = require("../models/Crop.js");


const registerFarmer = async (data) => {
  const { fullName, email, password, landSize } = data;

  const farmer = new User({
    fullName,
    email,
    password,
    landSize,
    role: "farmer",
  });

  return await farmer.save();
};

const loginFarmer = async (email, password) => {
  const farmer = await User.findOne({ email, role: "farmer" });
  if (!farmer) throw new Error("Farmer not found");

  const isMatch = await farmer.matchPassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  return farmer;
};


// const Crop = require("../models/Crop");



module.exports = {
  registerFarmer,
  loginFarmer,
};
