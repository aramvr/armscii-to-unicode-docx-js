const fs = require("fs");
const archiver = require("archiver");
const unzip = require("unzip");
const extract = require("extract-zip");
const rimraf = require("rimraf");
const convertor = require("./convertor");

const fileName = makeid();

const documentPath = `./extract/${fileName}/word/document.xml`;
const archivePath = `${__dirname}/extract/${fileName}`;

if (!fs.existsSync("output")) {
  fs.mkdirSync("output");
}

const outputFile = `output/${fileName}.docx`;

function extractDocx(uploadedDocument) {
  return new Promise(function(resolve, reject) {
    try {
      extract(uploadedDocument, { dir: archivePath }, function(err) {
        console.log("The archive was extracted!");
        resolve();
      });
    } catch (err) {
      console.error("Error to unarchive the document: ", err);
      reject(err);
    }
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
function saveFile(filename) {
  const folderName = "output/" + makeid();
  const newFileName = folderName + "/Converted" + filename;
  fs.mkdirSync(folderName);
  return new Promise(function(resolve, reject) {
    var output = fs.createWriteStream(newFileName);
    var archive = archiver("zip");
    archive.pipe(output);
    archive.directory(archivePath, false);
    archive.finalize();

    output.on("close", function() {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
      resolve(newFileName);
    });
    archive.on("error", function(err) {
      reject(err);
    });
  });
}

async function convertDocx(documentDir, filename) {
  return new Promise(async function(resolve, reject) {
    await extractDocx(documentDir);
    await convertToUnicode(documentPath);
    saveFile(filename).then(async res => {
      await rimraf.sync(archivePath);
      await rimraf.sync(documentDir);
      resolve(res);
    });
  });
}

function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports.convert = convertDocx;
