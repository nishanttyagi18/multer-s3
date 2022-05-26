require("dotenv").config();
const uuid = require("uuid").v4;

const {S3} = require('aws-sdk');

exports.s3Uploadv2 = async(files)=>{
    const s3 = new S3()
    
    const params = files.map(file => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${uuid()}-${file.originalname}`,
            Body: file.buffer
        };
    })

    return await Promise.all(
        params.map(param => {
            return s3.upload(param).promise();
        })
    )
}