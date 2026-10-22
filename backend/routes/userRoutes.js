
const express = require("express");
const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route: normal users and admins
router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to the protected dashboard!",
    user: req.user,
  });
});

// Admin-only route
router.get(
  "/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Welcome to the Admin Dashboard!",
      user: req.user,
    });
  }
);

module.exports = router;
