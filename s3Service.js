require("dotenv").config();
const uuid = require("uuid").v4;

const {S3} = require('aws-sdk');

exports.s3Uploadv2 = async(file)=>{
    const s3 = new S3()
    
    return await s3.upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${uuid()}-${file.originalname}`,
        Body: file.buffer
    }).promise();
}