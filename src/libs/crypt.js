import bcrypt from "bcryptjs";

export const bcryptHash = async (pass) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
  } catch (error) {
    console.error(error);
  }
};

export const bcryptCompare = async (pass, receivedPass) => {
  try {
    return await bcrypt.compare(pass, receivedPass);
  } catch (error) {
    console.error(error);
  } 
};
