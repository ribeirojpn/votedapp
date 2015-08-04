module.exports = function(app){
	var Poll = app.models.poll;
	var controller = {};

	controller.getPolls = function (req, res) {
		Poll.find().where('author').equals(req.user._id).exec().then(function (polls) {
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

	controller.getPollByName = function (req,res) {
		var namePoll = req.params.pollname;
		var poll = polls.filter(function (poll) {
			return poll.pollName == namePoll;
		})[0];
		if (poll){
			res.json(poll);
			console.log('poll enviada p.');
		} else {
			res.status(404).send('Poll não encontrada');
		}
	};

	controller.deletePoll = function (req,res) {
		var idPoll = req.params.id;
		Poll.remove({'_id':idPoll}).exec().then(function () {
			res.status(204).end();
		},function (erro) {
			console.error(erro);
		});
	};

	return controller;
};
