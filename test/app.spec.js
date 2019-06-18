const app = require( '../src/app' )
const STORE = require('../bookmarks')

// make sure to change the API_TOKEN if you change it in config!
describe('Bookmarks API Server', () => {
  
  it('GET /bookmarks respond OK with an array of length > 1', () => {
    
    return supertest(app)
      .get('/bookmarks')
      .set('Authorization', 'Bearer c649e8e0-de86-44bc-bf66-57a247ca0413') 
      .expect(200)
      .then((res) => {
        expect(res.body).to.eql(STORE)
      })
  })

  it('POST /bookmarks respond OK with an object', () => {

    return supertest(app)
      .post('/bookmarks')
      .set('Authorization', 'Bearer c649e8e0-de86-44bc-bf66-57a247ca0413') 
      .set('Content-Type', 'application/json')
      .send({
        "title": "TEST BOOKMARK TITLE", 
        "description": "TEST DESCRIPTION", 
        "url": "www.test.com", 
        "rating": "5"
      })
      .expect(201)
      .then((res) => {
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('title')
        expect(res.body).to.have.property('url')
        expect(res.body).to.have.property('description')
        expect(res.body).to.have.property('rating')
      })
  })

  it('GET /bookmarks/:id should respond OK with one bookmark object with an id that matches the one requested', () => {
    // TODO: IDs were switched to serial, so change this test.
    return supertest(app)
      .get('/bookmarks/0e67bb89-dcde-47c9-80e2-15620ecfd997')
      .set('Authorization', 'Bearer c649e8e0-de86-44bc-bf66-57a247ca0413') 
      .expect(200)
      .then ((res) => {
        expect(res.body).to.eql({
          "id": "0e67bb89-dcde-47c9-80e2-15620ecfd997",
          "title": "Facebook", 
          "url": "www.facebook.com",
          "description": "Facebook Content", 
          "rating": "3"
        })
    });
  })

  it('DELETE /bookmarks/:id should respond OK with at array of length 1 -- one bookmark, with an id that matches the one requested', () => {
    
    return supertest(app)
      .delete('/bookmarks/6e44b5b9-d1b5-4f33-8fbe-e52ddfa10b7c')
      .set('Authorization', 'Bearer c649e8e0-de86-44bc-bf66-57a247ca0413') 
      .expect(204)
  })
})