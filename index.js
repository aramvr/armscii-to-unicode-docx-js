const fs = require("fs");
const archiver = require("archiver");
const convertor = require("./convertor");
const unzip = require("unzip");
const extract = require("extract-zip");

var rimraf = require("rimraf");

const fileName = makeid();

const uploadedDocument = __dirname + "/ansi3.docx";
const documentPath = `./extract/${fileName}/word/document.xml`;
const archivePath = `${__dirname}/extract/${fileName}`;
const outputFile = `./output/${fileName}.docx`;

// init
convertDocx();

function extractDocx(uploadedDocument) {
  return new Promise(function(resolve, reject) {
    extract(uploadedDocument, { dir: archivePath }, function(err) {
      if (err) reject(err);
      else {
        console.log("The archive was extracted!");
        resolve();
      }
    });
  });
}

function convertToUnicode(documentPath) {
  return new Promise(function(resolve, reject) {
    const document = fs.readFile(documentPath, "utf8", function(err, contents) {
      const unicode = convertor.armsciiToUnicode(contents);
      fs.writeFile(documentPath, unicode, function(err) {
        if (err) {
          reject();
        }
        console.log("The characters are converted!");
        resolve();
      });
    });
  });
}
function saveFile() {
  return new Promise(function(resolve, reject) {
    var output = fs.createWriteStream(outputFile);
    var archive = archiver("zip");
    archive.pipe(output);
    archive.directory(archivePath, false);
    archive.finalize();

    output.on("close", function() {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
      resolve();
    });
    archive.on("error", function(err) {
      reject(err);
    });
  });
}

async function convertDocx() {
  await extractDocx(uploadedDocument);
  await convertToUnicode(documentPath);
  await saveFile();
  await rimraf.sync(archivePath);
  console.log("done");
}

function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
