const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register

router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and send response
    const user = await newUser.save();
    console.log("check");
    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    let validPassword;
    //find user
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json("Invalid username or password");
    } else {
      //validate password
      validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        res.status(400).json("Invalid username or password");
      } else {
        //send the response
        res.status(200).json({ _id: user._id, username: user.username });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
