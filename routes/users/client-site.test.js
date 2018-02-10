const request = require('supertest');
const clientSiteRoute = require('./client-site');

describe('GET / ', () => {
  it('Should render homepage', (done) => {
    request(clientSiteRoute)
      .get('/')
      .expect(200);
      done()
  })
})