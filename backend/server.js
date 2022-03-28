const express = require("express");
const goals = require("./routes/apiGoals");
const userRoutes = require("./routes/userRoute");
const { errorHandeler } = require("./AllMiddleware/errorsHandeleres");
const { mongoConnect } = require("./Databse/db");
const dotEnv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goals);
app.use("/api/users", userRoutes);
app.use(errorHandeler);

app.listen(PORT, () => console.log(`app is listening to ${PORT}`));
mongoConnect();
