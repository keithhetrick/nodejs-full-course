const fs = require("fs");
const path = require("path");

/*

// Read a file using relative path
// fs.readFile("./files/starter.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log("\nDATA: ", data);
// }
// );

// Read a file using path.join
fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log("\nDATA: ", data);
  }
);

console.log("\nHello...this is line typed after the read call");

// Write a file
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Hello, this is a reply",
  (err) => {
    if (err) throw err;
    console.log("\nWRITE FILE COMPLETE");

    // Append a file
    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n\nThis is an appended message on the file",
      (err) => {
        if (err) throw err;
        console.log("\nAPPEND FILE COMPLETE");

        // Rename a file
        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "newReply.txt"),
          (err) => {
            if (err) throw err;
            console.log("\nRENAME FILE COMPLETE");
          }
        );
      }
    );
  }
);

*/

const fsPromises = require("fs").promises;

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log("\nDATA: ", data);
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));

    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );

    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nThis is an appended message on the file"
    );

    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf8"
    );
    console.log("\nNEW DATA: ", newData);
  } catch (err) {
    console.error(err);
  }
};
fileOps();

// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error(`There as an uncaught error: ${err}`);
  process.exit(1);
});
