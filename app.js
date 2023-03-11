const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors());

const philosophesRoute = require("./routes/philosophes");
const educationRoute =require("./routes/education");
const schoolsRoute =require("./routes/schools");
const membersRoute=require("./routes/members");
const sayingsRoute=require("./routes/sayings");
const userRoute=require("./routes/user");

app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));

app.use("/philosophes", philosophesRoute);
app.use("/educations",educationRoute);
app.use("/sayings",sayingsRoute);
app.use("/members",membersRoute);
app.use("/schools",schoolsRoute);
app.use("/user",userRoute);

module.exports = app;
