const express = require("express");

const fileUpload = require("express-fileupload");
var algorithmia = require("algorithmia");
var client = algorithmia("simV0KqI9ACbVI+NFOjBaf5M7+b1");

const app = express();

app.use(fileUpload());

var cors = require("cors");
app.use(cors());
let imageNames = [];
var images = client.dir("data://ShreedharGHegde/images");
let img_file;

let crateDic = () => {
  return new Promise((resolve, reject) => {
    images.exists(function(exists) {
      if (exists == false) {
        nlp_directory.create(function(response) {
          if (response.error) {
            return console.log(
              "Failed to create dir: " + response.error.message
            );
          } else {
            console.log("Created directory: " + nlp_directory.data_path);
          }
        });
      } else {
        console.log("Your directory already exists.");
      }
      resolve(true);
    });
  });
};

let uploadFile = fileName => {
  return new Promise((resolve, reject) => {
    var local_file = `/home/shreedhar/gallery/client/src/uploads/${fileName}`;

    img_file = `data://ShreedharGHegde/images/${fileName}`;
    console.log("000", img_file);

    client.file(img_file).exists(function(exists) {
      // Check if file exists, if it doesn't create it
      if (exists == false) {
        images.putFile(local_file, function(response) {
          if (response.error) {
            return console.log(
              "Failed to upload file: " + response.error.message
            );
          } else {
            console.log("File uploaded.");
          }
        });
      } else {
        console.log("Your file already exists.");
      }
    });
    resolve(true);
  });
};

app.post("/upload", (req, url) => {
  if (req.files === null) {
    return url.json({ msg: "no file uploaded" });
  }

  const file = req.files.file;
  file.mv(`${__dirname}/client/src/uploads/${file.name}`, err => {
    if (err) {
      console.log(err);
      return err;
    }
    imageNames.push(file.name);
    console.log(imageNames);
    if (req.body.colorize) {
      crateDic()
        .then(result => {
          return uploadFile(file.name);
        })
        .then(res => {
          client.file(img_file).exists(function(exists) {
            // Download contents of file as a string if it exists
            console.log("====>", img_file);

            client.file(img_file).get(function(err, data) {
              if (err) {
                console.log("Failed to download file.");
                console.log(err);
              } else {
                console.log("Successfully downloaded data.");
              }
              var input = data;

              // Call an algorithm with text input by passing a string into the pipe method. The returned promise will be called with the response with the Algorithm completes (or when an error occurs). If the algorithm output is text, then the get() method on the response will return a string.

              client
                .algo("deeplearning/ColorfulImageColorization/1.1.13")
                .pipe(input)
                .then(function(response) {
                  url.send({
                    imgUploaded: file.name,
                    resultUrl: response.get().output
                  });
                });
            });
          });
        });
    }
  });
});

app.listen(5000, () => console.log("server started on port 5000"));
