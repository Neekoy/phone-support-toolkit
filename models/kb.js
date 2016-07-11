var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  name: String,
  approved: Boolean,
  keywords: [],
  content: [],
  uid: String
});

module.exports = mongoose.model("Articles", articleSchema);