import express from "express";
import User from "../model/userSchema.js";
import { upload } from "../multerConfig.js";

const router = express.Router();

//POST

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newUser = new User({
      ...req.body,
      image: req.file ? req.file.path : null,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User Created Successfully", savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//UPDATE

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.path;

    const updateUser = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "Updated Successfully", updateUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleteUSer = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully ", deleteUSer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
