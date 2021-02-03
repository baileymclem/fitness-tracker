const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
require("./routes/apiroutes")(app);
require("./routes/htmlRoutes")(app);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/safe-anchorage-38365",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});