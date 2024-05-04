import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

export const isAdmin = async () =>
  await userModel
    .find({ role: "admin" })
    .then(async (result) => {
      if (result.length === 0) {
        const password = process.env.ADMIN_PASSWORD;
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(password, salt);

        await userModel
          .create({
            userName: process.env.ADMIN_EMAIL,
            password: hashed,
            role: "admin",
          })
          .then(() => {
            console.log("New Admin Created");
          })
          .catch((err) => {
            console.error("Error creating admin", err);
          });
      }
    })
    .catch((err) => {
      console.error("Error fetching admin data", err);
    });
