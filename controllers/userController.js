const userModal = require("../models/userModel");

// login user
const loginController = async (req, res) => {
  try {
    const {userId,password} = req.body
    const user = await userModal.findOne({userId,password,verified:true});
    if(user){
      res.status(200).send(user);
    }else {
      res.json({
        message:'Login Failed',
        user,
      })
    }
    
  } catch (error) {
    console.log(error);
  }
};

// register
const registerController = async (req, res) => {
  try {
    const newUser = new userModal({...req.body,verified:true});
    await newUser.save();
    res.status(201).send("New User added Successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating item", error: error.message });
  }
};


module.exports = { loginController,registerController };
