const itemModel = require("../models/itemModel");

// Get items
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching items", error: error.message });
  }
};

// Add items
const addItemController = async (req, res) => {
  try {
    const newItem = new itemModel(req.body);
    await newItem.save();
    res.status(201).send("Item Created Successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating item", error: error.message });
  }
};

//update item
const editItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);
    await itemModel.findOneAndUpdate({ _id: itemId }, req.body, {
      new: true,
    });

    res.status(201).json("item Updated");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//delete item
const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
   
    await itemModel.findOneAndDelete({ _id:itemId });

    res.status(200).json("item Deleted");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

module.exports = { getItemController, addItemController, editItemController,deleteItemController };
