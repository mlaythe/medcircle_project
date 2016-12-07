const { expect } = require('chai');
const app = require('../server/server');
const request = require('supertest-as-promised')(app);
const qs = require('qs');
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

  it('should respond with article when ID parameter is specified', (done) => {
    request.get('/api/1.0/articles/1')
    .set('Authorization', token)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      const result = JSON.parse(res.text);
  
      try {
        expect(result['id']).to.eql(1);
        expect(result['author_name']).to.eql('Amy Kovacek');
      } catch(err) {
        throw new Error(err);
      }
      
      done();
    });
  });

  it('should respond with 400 when requesting an article that doesn\'t exist', (done) => {
    request.get('/api/1.0/articles/24000')
    .set('Authorization', token)
    .expect(400)
    .end(done)
  });

  it('should respond with article according to the query string specified', (done) => {
    const query = {
      author_name: 'Ernest Reynolds',
    };

    request.get(`/api/1.0/articles?${qs.stringify(query)}`)
    .set('Authorization', token)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      const result = JSON.parse(res.text);

      expect(result.length).to.eql(1);
      expect(result[0]['id']).to.eql(2);
      expect(result[0]['author_name']).to.eql('Ernest Reynolds');
      done();
    });
  });
});