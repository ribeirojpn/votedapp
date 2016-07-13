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

			it('add vote in poll option A', function (done) {
				Poll.findOneAndUpdate({name:'Test A', "options.name": 'A'},{$inc:{"options.$.value": 1}},{new: true}, function (err, poll) {
					request.get('/polls/Test%20A')
						.expect(200)
						.end(function (err,res) {
							expect(res.body.options[0].value).to.deep.equal(1);
							done(err);
						});
				});
			});

			it('add 3 votes in poll option B', function (done) {
				Poll.findOneAndUpdate({name:'Test A', "options.name": 'B'},{$inc:{"options.$.value": 3}},{new: true}, function (err, poll) {
					request.get('/polls/Test%20A')
						.expect(200)
						.end(function (err,res) {
							expect(res.body.options[1].value).to.deep.equal(3);
							done(err);
						});
				});
			});
		})
	})
}
