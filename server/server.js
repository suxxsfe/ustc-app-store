const validator = require("./validator");
validator.checkSetup();
const express = require("express"); 
const mongoose = require("mongoose");
const path = require("path"); 

const api_app = require("./apiApp");
const api_comment = require("./apiComment");
const api_reply = require("./apiReply");
const api_user = require("./apiUser");

const mongoConnectionURL =
  "mongodb+srv://mathdaren:coutendl@base0.129ulws.mongodb.net/";

const databaseName = "base0";
const options = { useNewUrlParser: true, useUnifiedTopology: true, dbName: databaseName};

// connect to mongodb
mongoose
  .connect(mongoConnectionURL, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

const app = express();
app.use(express.json());

// connect user-defined routes
app.use("/api", api_user);
app.use("/api", api_app);
app.use("/api",api_comment);
app.use("/api", api_reply);

app.use(validator.checkRoutes);
// // load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// // for all other routes, render index.html and let react router handle it
// app.get("*", (req, res) => {
//   res.sendFile(path.join(reactPath, "index.html"));
// });

// // any server errors cause this function to run
// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   if (status === 500) {
//     // 500 means Internal Server Error
//     console.log("The server errored when processing a request!");
//     console.log(err);
//   }

//   res.status(status);
//   res.send({
//     status: status,
//     message: err.message,
//   });
// });

// // hardcode port to 3000 for now
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
