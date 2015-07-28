module.exports = function(app){
  var Poll = app.models.poll;
  var controller = {};

	controller.getPollByName = function (req,res) {
    console.log('chegou no controller do app');
		var _name = req.params.pollname;
		Poll.findOne({name : _name}).exec().then(function (poll) {
			if(!poll) throw new Error('Poll não encontrado');
			res.json(poll);
		},function (erro) {
			console.log(erro);
			res.status(404).json(erro);
		});
	};

  controller.updatePoll = function (req,res) {
    var id = req.body._id;
    Poll.findByIdAndUpdate(id,req.body).exec().then(
      function (poll) {
        res.json(poll);
    }, function (erro) {
        res.status(500).json(erro);
    });
  }
  return controller;
}
