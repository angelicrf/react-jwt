const mongoose = require("mongoose");

const goalsSchema = mongoose.Schema({
        name : {
            type :  String,
            required: [true, 'name is required']
        }
    },
    {
            timestamps : true,
     }
   );

module.exports = mongoose.model('AllGoals', goalsSchema);