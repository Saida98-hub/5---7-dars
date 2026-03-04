const express = require("express");
const router = express.Router();
const User = require("../models/User");


// CREATE yoki UPDATE (Profile Save Changes)
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, phone, email } = req.body;

    // Email bo‘yicha user borligini tekshirish
    let user = await User.findOne({ email });

    if (user) {
      // Update
      user.firstName = firstName;
      user.lastName = lastName;
      user.phone = phone;

      await user.save();
      return res.status(200).json({ message: "Profile updated", user });
    }

    // Create
    user = new User({
      firstName,
      lastName,
      phone,
      email,
    });

    await user.save();

    res.status(201).json({ message: "User created", user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//  GET (profilni olish)
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;