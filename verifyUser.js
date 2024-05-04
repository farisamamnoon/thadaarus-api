import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

export const verifyUser = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({ success: false, message: "You must login first" });
  }
  const token = bearerToken.split(" ")[1];

  const secretKey = process.env.JWT_SECRET_KEY;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = decoded;
    // Proceed to the next middleware
    next();
  });
};
