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
});