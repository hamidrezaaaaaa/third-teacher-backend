const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());

const philosophesRoute = require("./routes/philosophes");
const competitionRoute=require("./routes/competition");
const educationRoute = require("./routes/education");
const researchRoute = require("./routes/research");
const schoolsRoute = require("./routes/schools");
const membersRoute = require("./routes/members");
const sayingsRoute = require("./routes/sayings");
const ordersRoute = require("./routes/orders");
const booksRoute = require("./routes/books");
const userRoute = require("./routes/user");

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/documents", express.static("documents"));

app.use("/philosophes", philosophesRoute);
app.use("/competition",competitionRoute);
app.use("/educations", educationRoute);
app.use("/research", researchRoute);
app.use("/sayings", sayingsRoute);
app.use("/members", membersRoute);
app.use("/schools", schoolsRoute);
app.use("/orders", ordersRoute);
app.use("/books", booksRoute);
app.use("/user", userRoute);

module.exports = app;
