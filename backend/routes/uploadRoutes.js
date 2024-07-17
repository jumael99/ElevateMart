import express from "express";
import multer from "multer";
import path from "path";
import sharp from "sharp";

const router = express.Router();
const storage = multer.memoryStorage();

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

export default router;
