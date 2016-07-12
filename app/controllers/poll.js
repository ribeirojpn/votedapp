module.exports = function (app) {
	var Poll = app.models.poll;
	var controller = {};

	controller.getUserPolls = function (req, res) {
		Poll.find().where('author').equals(req.user._id).exec().then(function (polls) {
			res.json(polls);
		},function (erro) {
			console.error(erro);
			res.status(500).json(erro);
		});
	};

	controller.getPolls = function (req, res) {
		Poll.find().exec().then(function (polls) {
			res.json(polls);
		},function (erro) {
			console.error(erro);
			res.status(500).json(erro);
		});
	};

	controller.savePoll = function (req,res) {
		req.body.author = req.user._id;
		Poll.create(req.body).then(function (poll) {
			res.status(201).json(poll);
		},function (erro) {
			console.log(erro);
			res.status(500).json(erro);
		});
	};

	controller.getPoll = function (req,res) {
		var _id = req.params.id;
		Poll.findById(_id).exec().then(function (poll) {
			if(!poll) throw new Error('Poll não encontrado');
			res.json(poll);
		},function (erro) {
			console.log(erro);
			res.status(404).json(erro);
		});
	};

	controller.deletePoll = function (req,res) {
		var idPoll = req.params.id;
		Poll.remove({'_id':idPoll}).exec().then(function () {
			res.status(204).end();
		},function (erro) {
			console.error(erro);
		});
	};

	controller.getPollByName = function (req,res) {
		var _name = req.params.name;
		Poll.findOne({name : _name}).exec().then(function (poll) {
			if (!poll) {
				res.status(404).json("Not found");
			}
			res.json(poll);
		},function (erro) {
			res.status(404).json(erro);
		});
	};

	// TODO Improve vote method
	controller.updatePoll = function (req,res) {
    var id = req.body._id;
    Poll.findByIdAndUpdate(id,req.body).exec().then(
      function (poll) {
        res.json(poll);
    }, function (erro) {
        res.status(500).json(erro);
    });
  }

	controller.voteInPoll = function (req,res) {
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
