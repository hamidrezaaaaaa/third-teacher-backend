const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors());

const philosophesRoute = require("./routes/philosophes");
const schoolsRoute =require("./routes/schools");
const educationRoute =require("./routes/education");
const userRoute=require("./routes/user");

app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));

app.use("/philosophes", philosophesRoute);
app.use("/educations",educationRoute);
app.use("/schools",schoolsRoute);
app.use("/user",userRoute);

module.exports = app;
