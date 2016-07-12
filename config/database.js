var mongoose = require('mongoose');
module.exports = function (uri) {
	if (process.env.NODE_ENV == 'test'){
  	mongoose.connect(uri + '-test');
	} else {
		mongoose.connect(uri);
		mongoose.set('debug',true);

	  mongoose.connection.on('connected', function () {
	    console.log('Connected on '+ uri);
	  });

	  mongoose.connection.on('disconnected', function () {
	    console.log('Disconnected on '+ uri);
	  });

	  mongoose.connection.on('erro', function (erro) {
	    console.log('Erro: ' + erro);
	  });

	  process.on('SIGINT', function () {
	    mongoose.connection.close(function () {
	      console.log('Desconectado pelo termino da aplicação');
	      process.exit(0);
	    });
	  });
	}

}
