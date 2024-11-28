import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "not auth no token" });
  }

  const token = authHeader.split("Bearer ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "not auth" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

export default authMiddleware;
