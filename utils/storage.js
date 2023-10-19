// const AWS = require("aws-sdk");
const s3 = new AWS.S3()

// store something
await s3.putObject({
    Body: JSON.stringify({key:"value"}),
    Bucket: "cyclic-smoggy-deer-overalls-ap-south-1",
    Key: "ChillTiger.png",
}).promise()

// get it back
let my_file = await s3.getObject({
    Bucket: "cyclic-smoggy-deer-overalls-ap-south-1",
    Key: "ChillTiger.png",
}).promise()

console.log(JSON.parse(my_file))