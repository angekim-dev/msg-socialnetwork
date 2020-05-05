const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

//middleware function
exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("req.file isn't there :(");
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        //here promise chosen as name, not necessarily
        .putObject({
            Bucket: "angekim-imageboard",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            // it worked!!!
            console.log("amazon put object complete!!! everything worked!!");
            next();
            fs.unlink(path, () => {}); //this is optional -> to keep uploads clean
            // deletes image from uploads folder
        })
        .catch((err) => {
            // uh oh
            console.log("Error in upload put object in s3.js", err);
            res.sendStatus(500);
        });
};
