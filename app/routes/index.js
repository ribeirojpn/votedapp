module.exports = function (app) {
	app.get('/', function (req,res) {
		var name = '';
		if(req.user){
			name = req.user.name;
		}

		res.render('index',{"usuarioLogado":name});
	});
}
