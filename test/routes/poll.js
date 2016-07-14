var mongoose = require('mongoose');

module.exports = function () {
	var userTest;
	describe('Poll Routes', function () {
		var User = mongoose.model('User');
		var Poll = mongoose.model('Poll');
		beforeEach(function (done) {
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

			it('GET /polls/Test%20A - returns a poll named "Test A"', function (done) {
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

			it('PUT /polls/Test%20A - vote B option in poll "Test A"', function (done) {
				var vote = {
					option: 'B'
				};

				request.put('/polls/Test%20A')
					.send(vote)
					.expect(200)
					.end(function (err,res) {
						expect(res.body.options[1].value).to.deep.equal(1);
						done(err);
					});
			});

			it('PUT /polls/Test%20AB - try to vote in "Test AB" but receive a 403 - "Poll not founded"', function (done) {
				var vote = {
					option: 'B'
				};

				request.put('/polls/Test%20ABC')
					.send(vote)
					.expect(403)
					.end(function (err,res) {
						expect(res.body).to.deep.equal("Poll not founded");
						done(err);
					});
			});
		})
	})
}
