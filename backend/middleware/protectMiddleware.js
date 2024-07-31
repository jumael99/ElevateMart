// @desc: Middleware to protect routes that require private access
const protectMiddleware = (access) => {
  return (req, res, next) => {
    console.log("Entered protectMiddleware", req.user);

    if (!req.user) {
      console.log("No user found in req.user");
      return res.status(401).json({
        status: "error",
        message: "Not authenticated. Please login to access this area.",
      });
    }
    if (access === "admin" && !req.user.isAdmin) {
      console.log("User is not admin");
      return res.status(403).json({
        status: "failed",
        message: "You are not allowed to perform this action.",
      });
    }
    console.log("Proceeding to next middleware or route handler");
    next();
  };
};


export default protectMiddleware;
