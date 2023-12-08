import User from "../models/userModel.js";
import createToken from "../config/jwtConfig.js";
import validateEmail from "../config/emailValidateConfig.js";
import { hashPassword, comparePassword } from "../config/bcryptConfig.js";

export const register = async (req, res) => {
  const { name, email, userPassword } = req.body;

  const validEmail = validateEmail(email);

  if (!validEmail)
    return res.status(200).json({ message: "Invalid email address" });

  //   Hash the password
  const hashedPassword = await hashPassword(userPassword);

  const user = {
    name,
    email,
    password: hashedPassword,
  };

  const newUser = new User(user);

  User.findOne({ email }).then(async (user) => {
    if (user) {
      console.log(user);
      return res.status(200).json({ message: "User already exist" });
    } else {
      //   Save new user to the database
      await newUser
        .save()
        .then(() => {
          res.status(200).json({ message: "User registered successfully" });
        })
        .catch((error) => {
          res.status(500).json({ message: "Internal server Error!" });
          console.log(error);
        });
    }
  });
};

export const login = async (req, res) => {
  const { email, userPassword } = req.body;

  console.log(email, userPassword)

  //check if the email and password are provided
  if (!email || !userPassword) {
    return res
      .status(200)
      .json({ message: "Email and the password are required" });
  }
  const validEmail = validateEmail(email);

  if (!validEmail)
    return res.status(200).json({ message: "Invalid email address" });

  //check for that user in the database
  User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        //user not found
        return res.status(200).json({ message: "User not found" });
      }

      //compare the provided passwords with the hashed password in the database

      const comparedPassword = await comparePassword(
        userPassword,
        user.password
      );

      if (!comparedPassword) {
        return res.status(200).json({ message: "Invalid entry!" });
      }

      const token = createToken(user._id);
      res
        .status(200)
        .json({
          message: "Logged in successfull",
          token: token,
          userData: { username: user.name, email: user.email, id: user._id, image: user.image || ''  },
        });
    })
    .catch((error) => {
      console.log("error in finding the user", error);
      res.status(500).json({ message: "Internal server Error!" });
    });
};
