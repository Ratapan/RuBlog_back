import { Router } from "express";

const router = Router();

import * as userCtrl from "../controllers/user.controller";
import { verifyTokenAndRole, isAdmin } from "../middlewares/authJwt";
import { checkRolesExisted } from "../middlewares/signin";
router.post(
  "/",
  verifyTokenAndRole,
  isAdmin,
  checkRolesExisted,
  userCtrl.createUser
);

export default router;
 