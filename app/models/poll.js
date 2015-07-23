var mongoose = require('mongoose');

module.exports = function () {
  var schema = mongoose.Schema({
    name: {
      type : String,
      require: true,
      index: {
        unique:true
      }
    },
    opions: [{
      name: {type: String},
      votes: {type: Number, default: 0},
      require: true
    }]
  })
}
