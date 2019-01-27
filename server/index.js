const fs = require("fs");
const os = require("os");
const express = require("express");
const app = express();
const busboy = require("connect-busboy");
const uniqueFilename = require("unique-filename");
const convertDocx = require("./convertDocx");
const path = require("path");
const rimraf = require("rimraf");

const router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(busboy());
app.use("/output", express.static("output"));

const root = router.get("/", async (req, res) => {
  res.send({
    version: "1.0.0"
  });
});

const convert = router.post("/", async (req, res) => {
  const randomTmpfile = uniqueFilename(os.tmpdir());
  let fstream;
  req.pipe(req.busboy);
  req.busboy.on("file", async function(fieldname, file, filename) {
    if (path.extname(filename) !== ".docx") {
      res.status(500).send({
        errorMessage: "File must be .docx"
      });
      await rimraf.sync(randomTmpfile);
      return;
    }
    console.log("Uploading: " + filename);
    fstream = fs.createWriteStream(randomTmpfile);
    file.pipe(fstream);
    fstream.on("close", function() {
      convertDocx.convert(randomTmpfile, filename).then(downloadUrl => {
        res.send({
          downloadLink: serverUrl(req, downloadUrl)
        });
      });
    });
  });
});

app.use("/api/", root);
app.use("/api/convert/", convert);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Listening on port " + port));

const serverUrl = (req, path) => {
  const url = req.protocol + "://" + req.get("host") + "/" + path;
  return url;
};
