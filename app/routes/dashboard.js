module.exports = function(app){
	var controller = app.controllers.dashboard;

	function checkAuth(req,res,next) {
		if (req.isAuthenticated()){
			return next();
		} else {
			res.status('401').json('Não autorizado');
		}
	}

	app.route('/dashboard')
		.get(checkAuth,controller.getPolls)
		.post(checkAuth,controller.savePoll);

	app.route('/dashboard/:id')
		.get(checkAuth,controller.getPoll)
		.delete(checkAuth,controller.deletePoll);
}
