var supertest = require('supertest')
var chai = require('chai')
var app = require('../index.js')

global.app = app
global.expect = chai.expect
global.request = supertest(app)
