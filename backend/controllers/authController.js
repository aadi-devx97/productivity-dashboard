const User = require("../models/User")
const bcrypt = require("bcrypt")

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

module.exports = {
  registerUser,
}