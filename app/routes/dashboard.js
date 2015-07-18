module.exports = function(app){
	var controller = app.controllers.dashboard;
	
	app.route('/dashboard')
		.get(controller.getPolls)
		.post(controller.savePolls);
	
	app.route('/dashboard/:id')
		.get(controller.getPoll)
		.delete(controller.deletePoll);
}