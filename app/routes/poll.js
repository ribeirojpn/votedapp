module.exports = function (app) {
	var controller = app.controllers.poll;

	app.route('/polls')
		.get(controller.getPolls)

	app.route('/polls/:name')
		.get(controller.getPollByName)
		.put(controller.updatePoll)

	app.route('/user/polls')
		.get(checkAuth, controller.getUserPolls)
		.post(checkAuth, controller.savePoll)
		
	app.route('/user/polls/:id')
		.get(checkAuth, controller.getPoll)
		.delete(checkAuth, controller.deletePoll)

	function checkAuth(req,res,next) {
		if (req.isAuthenticated()){
			return next();
		} else {
			res.status('401').json('Não autorizado');
		}
	}
}
