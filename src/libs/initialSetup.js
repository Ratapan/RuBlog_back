import { bcryptHash } from "../libs/crypt";
import Role from "../models/Role.js";
import User from "../models/User.js";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();
    // check for existing roles
    if (count > 0) return;
    // Create default Roles
    await new Role({ name: "reader" }).save();
    await new Role({ name: "writer" }).save();
    await new Role({ name: "admin" }).save();

    const countUser = await User.estimatedDocumentCount();
    if (countUser > 0) return;

    await new User({
      userName: "ADMIN_BLOG",
      email: "ADMIN_BLOG",
      password: await bcryptHash("ADMIN_BLOG"),
      checkup: true,
      role: await Role.findOne({ name: "admin" })._id,
    }).save();

    console.log("initSetup ok");
    return;
  } catch (error) {
    console.error(error);
  }
};

createRoles();
