const { expect } = require('chai');
const app = require('../server/server');
const request = require('supertest-as-promised')(app);
const config = require('config');
const token = config.get('bearer-token');

describe('oAuth bearer token', () => {

  it('should respond with 200 when using correct token', (done) => {
    request.get('/api/1.0')
    .set('Authorization', token)
    .expect(200)
    .end(done);
  });

  it('should respond with 401 when using incorrect token', (done) => {
    request.get('/api/1.0')
    .set('Authorization', 'foobar')
    .expect(401)
    .end(done);
  });

  it('should respond with 401 when no token provided', (done) => {
    request.get('/api/1.0')
    .set('Authorization', 'foobar')
    .expect(401)
    .end(done);
  });
});

describe('Article GET', () => {

  it('should respond with all articles when no ID specified', (done) => {
    request.get('/api/1.0/articles')
    .set('Authorization', token)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      const result = JSON.parse(res.text);
  
      try {
        expect(result.length).to.eql(10);
      } catch(err) {
        throw new Error(err);
      }
      
      done();
    });
  });
});