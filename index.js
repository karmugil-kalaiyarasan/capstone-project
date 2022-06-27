const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const cors = require("cors");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

// app.use(express.static(path.join(__dirname, "/frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
// });

app.listen(process.env.PORT || 5001, () => {
  console.log("server started");
});
