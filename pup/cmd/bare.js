// esm to enable import/export in Node
// This is the file that can be run with node run.js
require = require("esm")(module /*, options*/);
module.exports = require("../tests/bare.js");

// Handle unhandledRejection promises and exit the process
process.on("unhandledRejection", (error) => {
  // Will print "unhandledRejection err is not defined"
  console.log("Error Message", error.message);
  console.group("------ Stack Trace ------");
  console.log(error.stack);
  process.exit(1);
});
