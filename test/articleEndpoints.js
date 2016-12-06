const { expect } = require('chai').expect;
const app = require('../server/server');
const request = require('supertest-as-promised')(app);
const config = require('config');

describe('oAuth bearer token', () => {

  it('should respond with 200 when using correct token', (done) => {
    request.get('/api')
    .set('Authorization', config.get('bearer-token'))
    .expect(200)
    .end(done);
  });

  it('should respond with 401 when using incorrect token', (done) => {
    request.get('/api')
    .set('Authorization', 'foobar')
    .expect(401)
    .end(done);
  });
});