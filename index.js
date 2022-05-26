require("dotenv").config();
const express = require("express");
const multer = require("multer");
const {s3Uploadv2} = require('./s3Service')
const app = express();

// custom filename
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    // cb(null, false);
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 /* 5 MB */ },
  files: 2,
});

app.post("/upload", upload.array("file"), async(req, res) => {
//   console.log(req.files); // we can see the metadata of files uploaded
  const file = req.files[0];
  const result = await s3Uploadv2(file);
  res.json({ status: "success", result });
});

// error handling - it got triggered if any of our controller throws an error
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.json({ message: "File size is too large" });
    }

    if (err.code === "LIMIT_FILE_COUNT") {
      return res.json({ message: "File Limit reached" });
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.json({ message: "Unexpected file" });
    }
  }
});

app.listen(3000, () => console.log("running on 3000"));
