var mongoose = require('mongoose');

module.exports = function () {
  var OptionSchema = mongoose.Schema({
    name: String,
    value: {type: Number, default: 0}
  });

  var schema = mongoose.Schema({
    name: {
      type : String,
      require: true,
      index: {
        unique:true
      }
    },
    options: [{}]
  });

  return mongoose.model('Poll', schema);
};
