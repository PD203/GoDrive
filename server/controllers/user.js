const blackListToken = require("../models/blackListToken");
const userModel = require("../models/user");
const userService = require("../services/user");
const { validationResult } = require("express-validator");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password} = req.body;

  const isUserAlready = await userModel.findOne({ email });

  if (isUserAlready) {
    return res.status(400).json({ message: "User already exist" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  let imageUrl = "";
  if (req.file) {
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "profile_pictures",
    });
    imageUrl = uploadedImage.secure_url || "";
  }

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    image: imageUrl || "",
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.updateUserProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email } = req.body;
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.fullname = {
      firstname: firstname || user.fullname.firstname,
      lastname: lastname || user.fullname.lastname,
    };
    user.email = email || user.email;

    if (req.file) {
      try {
        const uploadedImage = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "profile_pictures" }, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            })
            .end(req.file.buffer);
        });
        user.image = uploadedImage.secure_url;
      } catch (uploadError) {
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    await user.save();
    const token = user.generateAuthToken();
    res.cookie("token", token);

    res.status(200).json({
      message: "Profile updated successfully",
      token,
      user,
    });
  });
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blackListToken.create({ token });

  res.status(200).json({ message: "Logged out" });
};
