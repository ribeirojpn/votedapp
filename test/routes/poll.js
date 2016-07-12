var mongoose = require('mongoose');

module.exports = function () {
	var userTest;
	describe('Poll Routes', function () {

		beforeEach(function (done) {
			var User = mongoose.model('User');
			var Poll = mongoose.model('Poll');

			User.findOrCreate(
				{'login': 'test@email.com'},
				{'name': 'testUser',
				'photo': 'noprofilepicture'},
				function (erro, user) {
					if(erro){
						console.log(erro)
					} else {

						userTest = user;
						Poll.create({
							name: 'Test A',
							options: [
								{
									name: 'A',
									value: 0
								},
								{
									name: 'B',
									value: 0
								}
							],
							author: userTest._id
						}).then(function (poll) {},function (erro) { throw new erro; });
						done()
					}
				}
			)
		});

		describe('No Auth', function () {
			it('GET /polls - returns a list with all polls created', function (done) {
				request.get('/polls')
					.expect(200)
					.end(function (err,res) {
						expect(res.body.length).to.deep.equal(1);
						done(err);
					});
			});

			it('GET /polls/Test%20A - returns a list with all polls created', function (done) {
				request.get('/polls/Test%20A')
					.expect(200)
					.end(function (err,res) {
						expect(res.body.name).to.deep.equal('Test A');
						done(err);
					});
			});

			it('GET /polls/Test%20ABCD - returns 404 - Not Found', function (done) {
				request.get('/polls/TestABCD')
					.expect(404)
					.end(function (err,res) {
						expect(res.body).to.deep.equal('Not found');
						done(err);
					});
			});
		})
	})
}
