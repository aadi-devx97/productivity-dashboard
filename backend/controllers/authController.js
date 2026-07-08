const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json(user)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to register user",
    })
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    const token = jwt.sign(
      {
        userId: user._id 
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    )

    res.json({
      message: "Login successful", 
      token,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Login failed",
    })
  }
}

module.exports = {
  registerUser,
  loginUser,
}