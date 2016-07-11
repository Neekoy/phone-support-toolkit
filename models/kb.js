var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  id: String,
  name: String,
  keywords: [],
  approved: Boolean,
  author: String,
  content: String
});

module.exports = mongoose.model("Articles", articleSchema);