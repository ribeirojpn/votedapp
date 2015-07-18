var polls = [{
	_id:1,
	pollName:"Melhor filme da Marvel",
	options:[{
		name: "Homem de Ferro",
		stats: 1
		},
		{
		name: "Vingadores",
		stats: 2
		},
		{
		name: "Cap. America: Soldado Invernal",
		stats: 8
		}
	]
},{
	_id:2,
	pollName:"Melhor filme da DC",
	options:[{
		name: "Cavaleiro das Trevas",
		stats: 6
		},
		{
		name: "Batman vs Superman",
		stats: 8
		},
		{
		name: "Suicide Squad",
		stats: 2
		}
	]
},{
	_id:3,
	pollName:"Melhor filme da FOX",
	options:[{
		name: "Deadpool",
		stats: 16
		},
		{
		name: "X-men: Apocalipse",
		stats: 8
		},
		{
		name: "Quarteto Fantastico(2016)",
		stats: 2
		}
	]
},{
	_id:4,
	pollName:"Melhor serie de TV sobre quadrinhos",
	options:[{
		name: "Arrow",
		stats: 16
		},
		{
		name: "The Flash",
		stats: 8
		},
		{
		name: "Gotham",
		stats: 2
		},
		{
		name: "Marvel: Agents of Shield",
		stats: 6
		},
		{
		name: "Demolidor",
		stats: 23
		}
	]
}];

var ID_POLL_INC = 4;

module.exports = function(){
	var controller = {};
	controller.getPolls = function (req, res) {
		res.json(polls);
		console.log('polls enviadas');
	};
	
	controller.savePolls = function (req,res) {
		var poll = req.body;
		poll._id = ++ID_POLL_INC;
		for (var i in poll.options){
			poll.options[i].stats = 0;
		}
		polls.push(poll);
		
		res.json(poll);
	};
	
	controller.getPoll = function (req,res) {
		var idPoll = req.params.id;
		var poll = polls.filter(function (poll) {
			return poll._id == idPoll;
		})[0];
		if (poll){
			res.json(poll);
		} else {
			res.status(404).send('Poll não encontrada');
		}
	};
	
	controller.deletePoll = function (req,res) {
		var idPoll = req.params.id;
		polls = polls.filter(function(poll){
			return poll._id != idPoll;
		});
		res.status(204).end();
	};
	
	return controller;
};