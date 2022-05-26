const express = require("express");
const multer = require("multer");
const app = express();

const upload = multer({ dest: "uploads/" });

const multiUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

app.post("/upload", multiUpload, (req, res) => {
  console.log(req.files); // we can see the metadata of files uploaded
  res.json({ status: "success" });
});

app.listen(3000, () => console.log("running on 3000"));
