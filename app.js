const connection = require("./dbConfig");

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return;
  }
  console.log("Connected to database!");
  connection.end();
});
