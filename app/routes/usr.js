module.exports = function(app){
	var controller = app.controllers.usr;
	app.get('/usr');

	app.route('/usr/:pollname')
		.get(controller.getPollByName);
}
