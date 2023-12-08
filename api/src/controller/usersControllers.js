import User from "../models/userModel.js";
import validateEmail from '../config/emailValidateConfig.js'

export const updateUsersInfo = async (req, res) => {
  const { userId } = req.params;
  const { imgBase64, name, email } = req.body;

  // Validate user email 
  if(!validateEmail(email) && email) return res.status(200).json({ message: "Invalid email" })

  // Find the user by ID
  const user = await User.findById(userId);

  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (imgBase64) {
      user.image = imgBase64;
    }


    if (name) {
      user.name = name;
    }

    if (email && validateEmail(email)) {
      user.email = email;
    }

    await user.save().then((res) => console.log(res))
    console.log('Edit successful')

    // Respond with success message
    res.status(200).json({ message: "User information updated successfully" });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
