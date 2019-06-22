const knex = require('knex');
const fixtures = require('./bookmarks-fixtures');
const app = require('../src/app');

describe('Bookmarks endpoints', () => {

    let db;

    before ('Make knex instance', () => {
        db = knex({
            client : 'pg', 
            connection : process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => db('bookmarks-test').truncate())

    afterEach('cleanup', () => db('bookmarks-test').truncate())

    describe('Unauthorized requests', () => {
        const testBookmarks = fixtures.makeValidBookmarksArray()

        beforeEach('insert bookmarks', () => {
            return db  
                .into('bookmarks-test')
                .insert(testBookmarks)
        })

        it('Responds with 401 Unauthorized for GET /bookmarks by default', () => {
            return supertest(app)
                .get('/bookmarks')
                .expect(401, {error : 'Unauthorized Request'})
        })

        it('Responds with 401 Unauthorized for POST /bookmarks by default', () => {
            return supertest(app)
                .post('/bookmarks')
                .send({title : 'test-title', url : 'www.test.com', rating : 1})
                .expect(401, { error: 'Unauthorized request' })
        })

        it('Responds with 401 Unauthorized for GET /bookmarks/:id by default', () => {
            const secondBookmark = testBookmarks[1]
            return supertest(app)
                .get(`/bookmarks/${secondBookmark.id}`)
                .expect(401, { error : 'Unauthorized Request'})
        })

        it('Responds with 401 Unauthorized for DELETE /bookmarks/:id by default', () => {
            const aBookmark = testBookmarks[1]
            return supertest(app)
                .delete(`/bookmarks/${aBookmark.id}`)
                .expect(401, { error : 'Unauthorized request'})
        })
    })
});