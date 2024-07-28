import express from "express";
import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import protectMiddleware from "../middleware/protectMiddleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const __dirname = path.resolve();

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/user", (req, res) => {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    const outputPath = `uploads/users/${req.file.fieldname}-${Date.now()}.png`;

    try {
      await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat("png")
        .png({ quality: 90 })
        .toFile(outputPath);
      res.status(200).send({
        message: "Image uploaded and resized successfully",
        image: `/${outputPath}`,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
});

router.post("/product", (req, res) => {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    const outputPath = `uploads/products/${
      req.file.fieldname
    }-${Date.now()}.png`;

    try {
      await sharp(req.file.buffer)
        .resize(1200, 800)
        .toFormat("png")
        .png({ quality: 90 })
        .toFile(outputPath);

      res.status(200).send({
        message: "Image uploaded and resized successfully",
        image: `/${outputPath}`,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
});

router.use(protectMiddleware());

router.post("/removeImage", (req, res) => {
  const removeSingleImage = (req, res, callback) => {
    const imagePath = req.body.imagePath;

    if (!imagePath) {
      return res.status(400).json({ error: "Image path is required" });
    }

    if (
      !imagePath.startsWith("/uploads/users") &&
      !imagePath.startsWith("/uploads/products")
    ) {
      return res.status(400).json({
        error: "Invalid image path. You can only delete product or user image",
      });
    }

    if (imagePath.startsWith("/uploads/products")) {
      if (!req.user.isAdmin) {
        return res.status(403).json({
          error: "You are not allowed to delete product images",
        });
      }
    }

    const fullPath = path.join(__dirname, imagePath);

    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error("Error removing image:", err);
        return res.status(500).json({ error: "Failed to remove image" });
      }

      res.status(200).json({ message: "Image removed successfully" });
      callback(null);
    });
  };

  removeSingleImage(req, res, async function (err) {
    if (err) {
      console.error("Error in callback:", err);
    }
  });
});

export default router;
