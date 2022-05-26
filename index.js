const express = require("express");
const multer = require("multer");
const uuid = require("uuid");
const app = express();

// custom filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${uuid()}-${file.originalname}`);
    }
})

const upload = multer({storage})

app.post("/upload", upload.array("file"), (req, res) => {
  console.log(req.files); // we can see the metadata of files uploaded
  res.json({ status: "success" });
});

app.listen(3000, () => console.log("running on 3000"));
