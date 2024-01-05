const connection = require("./dbConfig");
const express = require("express");
const bodyParser = require("body-parser");
const businessRoutes = require("./src/routes/businessRoutes");

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return;
  }
  console.log("Connected to database!");
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/business", businessRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
