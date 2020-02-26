const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

// routes
const estimationRouter = require("./routes/estimation");

const app = express();

// configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/estimation", estimationRouter);

// serve client
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () =>
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port: ${PORT}`
  )
);
