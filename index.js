require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const vhost = require("vhost");

const APIRoutes = require("./api/routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(APIRoutes);

app.use(
  express
    .Router()
    .use(express.static(path.join(__dirname, "client/build")))
    .use("/", (req, res) => {
      res.sendFile(path.join(__dirname + "/client/build/index.html"));
    })
);

app.use(
  vhost(
    `admin.${process.env.HOST}`,
    express
      .Router()
      .use(express.static(path.join(__dirname, "admin/build")))
      .use("/", (req, res) => {
        res.sendFile(path.join(__dirname + "/admin/build/index.html"));
      })
  )
);

app.listen(port, () => console.log(`App is listening at port ${port}`));
