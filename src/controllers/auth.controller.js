import jwt from "jsonwebtoken";
import User from "../models/User";
import { bcryptHash, bcryptCompare } from "../libs/crypt";
import config from "../config";
import Role from "../models/Role";

export const signup = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    userName: username,
    email: email,
    password: await bcryptHash(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.role = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "reader" });
    newUser.role = [role._id];
  }
  const userSaved = await newUser.save();
  const token = jwt.sign({ id: userSaved._id }, config.SECRET, {
    expiresIn: 86400, //24hrs
  });

  res.status(200).json({ token });
};
export const signin = async (req, res) => {
    const { email, password } = req.body;

    const userFound = await User.findOne({email:email}).populate("role")

    //no existe el correo
    if(!userFound) return res.status(400).json({message:"User not found"});

    const matchPassword = await bcryptCompare(password, userFound.password)

    //contraseña invalida
    if(!matchPassword) return res.status(401).json({message:"Invalid password"});

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400, //24hrs
      });
    res.status(200).json({token:token});
};