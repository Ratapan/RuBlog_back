import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};
export const verifyTokenAndRole = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    const user = await User.findById(decoded.id);
    req.userRoles = user.role;
    if (!user) return res.status(404).json({ message: "User not found" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};

export const isAdmin = async (req, res, next) => {
  try {
    const roles = await Role.find({ _id: { $in: req.userRoles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require admin Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
export const isWriter = async (req, res, next) => {
  try {
    const roles = await Role.find({ _id: { $in: req.userRoles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "writer") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require writer Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
export const isReader = async (req, res, next) => {
  try {
    const roles = await Role.find({ _id: { $in: req.userRoles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "reader") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require reader Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
