const { response } = require("express");
const express = require("express");
const goals = require("./routes/apiGoals");
const controller = require("./controllers/goalsController");
const {errorHandeler} = require("./AllMiddleware/errorsHandeleres");
const dotEnv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended : false}) );

app.use('/api/goals', goals);
app.use('/api/controllers', controller);
app.use(errorHandeler);

app.listen(PORT ,() => console.log(`app is listening to ${PORT}`));