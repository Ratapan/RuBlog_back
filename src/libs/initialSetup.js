import Role from "../models/Role.js";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();
    // check for existing roles
    if (count > 0) return;
    // Create default Roles
    await Promise.all([
      new Role({ name: "reader" }).save(),
      new Role({ name: "writer" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

  } catch (error) {
    console.error(error);
  }
}; 
 
createRoles();