const mongoose = require("mongoose");

const addSchema = new mongoose.Schema({
  id: {
    type: "string",
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  role: {
    type: "string",
    require: true,
    default: "user",
  },
});
module.exports = LoginTable = mongoose.model("LoginTable", addSchema);
