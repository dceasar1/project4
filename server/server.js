const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const mongoose = require("mongoose");


mongoose.connect(
  "mongodb+srv://devantemceasar:nLYELMQHBygensPZ@cluster0.umziibu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("connected to mongodb")).catch((error) => console.log(error));

app.use(cors({ origin: "*" }));
app.use(express.json())
app.get("/api", (req, res) => {
  res.json({ userArray: ["userOne", "userTwo", "userThree", "userFour"] });
});
app.use("/auth", authRouter);
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
