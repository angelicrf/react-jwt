const express = require("express");
const goals = require("./routes/apiGoals");
const userRoutes = require("./routes/userRoute");
const { errorHandeler } = require("./AllMiddleware/errorsHandeleres");
const { mongoConnect } = require("./Databse/db");
const dotEnv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goals);
app.use("/api/users", userRoutes);
app.use(errorHandeler);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) =>
    res.json({
      success: true,
      message: "change env to production",
    })
  );
}
app.listen(PORT, () => console.log(`app is listening to ${PORT}`));
mongoConnect();
