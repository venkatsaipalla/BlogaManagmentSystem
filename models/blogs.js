const mongoose = require("mongoose");

const addSchema = new mongoose.Schema({
  id: {
    type: "string",
    required: true,
  },
  title: {
    type: "string",
    required: true,
  },
  content: {
    type: "string",
  },
});
module.exports = BlogsTable = mongoose.model("BlogsTable", addSchema);
