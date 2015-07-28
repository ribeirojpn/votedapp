module.exports = function(app){
	var controller = app.controllers.usr;
	app.route('/usr')
		.post(controller.updatePoll);

	app.route('/usr/:pollname')
		.get(controller.getPollByName);
}
