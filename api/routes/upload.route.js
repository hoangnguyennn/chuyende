const router = require("express").Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        Date.now() +
        path.extname(file.originalname)
    );
  }
});
const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  return res.status(200).json({ url: req.file.filename });
});

module.exports = router;
