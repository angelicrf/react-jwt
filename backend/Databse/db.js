const mongoose = require("mongoose");
const mongoConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    if (connect) {
      console.log(`MongoDb is connected ${connect.connection.host}`);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  mongoConnect,
};
