const express = require('express');
const multer = require('multer');
const app = express();


const upload = multer({dest : "uploads/"})

app.post('/upload',upload.array("file", 2), (req,res)=>{
    res.json({status: 'success'})
})

app.listen(3000,()=> console.log("running on 3000"))