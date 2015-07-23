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

module.exports = function(){
  var controller = {};
	
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
  return controller;
}
