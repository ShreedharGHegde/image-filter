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
let uploadedFile;
// let crateDic = () => {
//   return new Promise((resolve, reject) => {
//     images.exists(function(exists) {
//       if (exists == false) {
//         images.create(function(response) {
//           if (response.error) {
//             return console.log(
//               "Failed to create dir: " + response.error.message
//             );
//           } else {
//             console.log("Created directory: " + images.data_path);
//           }
//         });
//       } else {
//         console.log("Your directory already exists.");
//       }
//       resolve(true);
//     });
//   });
// };

// let uploadFile = fileName => {
//   return new Promise((resolve, reject) => {
//     var local_file = `/home/shreedhar/gallery/client/src/uploads/${fileName}`;

//     img_file = `data://ShreedharGHegde/images/${fileName}`;
//     console.log("000", img_file);

//     client.file(img_file).exists(function(exists) {
//       // Check if file exists, if it doesn't create it
//       if (exists == false) {
//         images.putFile(local_file, function(response) {
//           if (response.error) {
//             return console.log(
//               "Failed to upload file: " + response.error.message
//             );
//             reject(false);
//           } else {
//             console.log("File uploaded.", response);

//             resolve(response);
//           }
//         });
//       } else {
//         console.log("Your file already exists.");
//         resolve(true);
//       }
//     });
//   });
// };

app.post("/upload", (req, url) => {
  console.log("upload");
  // if (req.files === null) {
  //   return url.json({ msg: "no file uploaded" });
  // }

  // let file = null;
  // if (req.files) {
  //   file = req.files.file;
  //   file.mv(`${__dirname}/client/src/uploads/${file.name}`, err => {
  //     if (err) {
  //       console.log(err);
  //       return err;
  //     }
  //   });
  //   imageNames.push(file.name);
  // }

  // if (req.body.colorize == "true" || req.body.floortestUrl !== "false") {
   console.log('body',req.body)
    if (req.body.floortestUrl !== "false") {
      console.log("floortest");
      let value
      if(req.body.floortest === 'flooronly'){
        value = true
      } else {
        value = false
      }
      input = {
        file: req.body.floortestUrl,
        floor_only: value
      };
      console.log('input',input);
      client
        .algo("godmode/flooring_detection/0.1.2")
        .pipe(input)
        .then(function(response) {
          console.log(response);
          
          url.send(response.get());
        });
    }

    // crateDic()
    //   .then(result => {
    //     return uploadFile(file.name);
    //   })
    //   .then(res => {
    //     client.file(img_file).exists(function(exists) {
    //       // Download contents of file as a string if it exists
    //       console.log("====>", img_file);

    //       client.file(img_file).get(function(err, data) {
    //         if (err) {
    //           console.log("Failed to download file.");
    //           console.log(err);
    //         } else {
    //           console.log("Successfully downloaded data.");
    //         }
    //         var input = data;
    //         // let result = {};
    //         // Call an algorithm with text input by passing a string into the pipe method. The returned promise will be called with the response with the Algorithm completes (or when an error occurs). If the algorithm output is text, then the get() method on the response will return a string.
    //         if (req.body.colorize == "true") {
    //           console.log("colorize");
    //           client
    //             .algo("deeplearning/ColorfulImageColorization/1.1.13")
    //             .pipe(input)
    //             .then(function(response) {
    //               // url.send({
    //               //   imgUploaded: file.name,
    //               //   resultUrl: response.get().output
    //               // });
    //               // result.imgUploaded = file.name;
    //               // result.resultUrl = response.get().output
    //               console.log("colorize response", response.get());
    //             });
    //         }
    //       });
    //     });
    //   });
  // }
  })

app.listen(5000, () => console.log("server started on port 5000"));
