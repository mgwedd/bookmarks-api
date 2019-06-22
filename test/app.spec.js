const app = require( '../src/app' )

// make sure to change the API_TOKEN if you change it in config!
describe('Bookmarks API Server', () => {
  
  it('GET / respond OK ', () => {
    
    return supertest(app)
      .get('/')
      .set('Authorization', 'Bearer d9e40555-bbc2-4404-a7a0-a506d6ac88a4') 
      .expect(200)
  })

});