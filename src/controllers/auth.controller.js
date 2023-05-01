import jwt from "jsonwebtoken";
import User from "../models/User";
import { bcryptHash, bcryptCompare } from "../libs/crypt";
import config from "../config";
import Role from "../models/Role";
import {sendAnMail, util} from "../messages/config";


export const signup = async (req, res) => {
  //asignacion de roles admin
  
  // if (roles) {
  //   const foundRoles = await Role.find({ name: { $in: roles } });
  //   newUser.role = foundRoles.map((role) => role._id);
  // } 

  const { username, email, password } = req.body;

  const newUser = new User({
    userName: username,
    email: email,
    password: await bcryptHash(password),
    role: await Role.findOne({ name: "reader" })._id,
    checkup: false,
  });
  
  const userSaved = await newUser.save();
  const token = jwt.sign({ id: userSaved._id }, config.SECRET, {
    expiresIn: 86400, //24hrs
  });
  const tokenVal = jwt.sign({ id: userSaved._id, validate:true }, config.SECRET, {
    expiresIn: 86400*3, //3 Dias
  });
  
  const verif = util.checkupMail(username,tokenVal);

  console.log('html',verif)

  let info = await sendAnMail(email,`Verificacion de correo en RuBlog`,verif)
  
  console.log(info)
   
  res.status(200).json({ token });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email: email }).populate("role");

  //no existe el correo
  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = await bcryptCompare(password, userFound.password);

  //contraseña invalida
  if (!matchPassword)
    return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400, //24hrs
  });
  res.status(200).json({ token: token });
};

export const checkup = async (req, res) => {
  try{
    const decoded = jwt.verify(req.params.validate, config.SECRET);
    if(!decoded.validate) return res.status(400).json({ message: "Invalid token" });
    const userFound = await User.findByIdAndUpdate(decoded.id, {checkup: true},{new: true})
    res.status(200).json(userFound);
  }
  catch{
    return res.status(400).json({ message: "Invalid token" });
  }
};
