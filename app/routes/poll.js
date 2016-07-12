module.exports = function (app) {
	var controller = app.controllers.poll;

	app.route('/polls')
		.get(controller.getPolls)

	app.route('/polls/:name')
		.get(controller.getPollByName)
		.put(controller.updatePoll)

	function checkAuth(req,res,next) {
		if (req.isAuthenticated()){
			return next();
		} else {
			res.status('401').json('Não autorizado');
		}
	}
}
