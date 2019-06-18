const express = require('express');
const bookmarksRouter = express.Router();
const bodyParser = express.json();
const logger = require('./logger');
const BookmarksService = require('./BookmarksService');

// *+*+*+*+*+**+*+*+*+*+**+*+*+*+*+**+*+
// *+*+*+*+*+* STATIC ROUTES *+*+*+*+*+*
// *+*+*+*+*+*  GET & POST *+*+*+*+**+*+

bookmarksRouter

    .route('/bookmarks')
    
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        BookmarksService.getAllBookmarks(knexInstance)
            .then(bookmarks => {
                res
                    .json(bookmarks);
            })
            .catch(next);
    })

    .post(bodyParser, (req, res, next)=> {
        
        // Parse and validate the bookmark data the client wants to POST.
        const { title, url, description, rating } = req.body;

        if (!title) {
            logger.error(`Title is required`);
            return res
                .status(400)
                .send('Invalid data');
        }
            
        if (!url) {
            logger.error(`URL is required`);
            return res
                .status(400)
                .send('Invalid data');
        }

        if (!description) {
            logger.error(`Description is required`);
            return res
                .status(400)
                .send('Invalid data');
        }
        
        if (!rating) {
            logger.error(`Rating is required`);
            return res
                .status(400)
                .send('Invalid data');
        }
    
        const newBookmark = {
            title,
            url,
            description, 
            rating
        }
        
        // POST the new bookmark to the database.
        const knexInstance = req.app.get('db');

        BookmarksService.insertBookmark(knexInstance, newBookmark)
            .then(bookmark => {
                if (!bookmark) {
                    return res.status(422).json({
                        error: { message: `Unable to create bookmark` }
                    });
                }
                res
                    .status(201)
                    .location(`http://localhost:8000/bookmark/${bookmark.id}`)
                    .json(bookmark);
            })
            .catch(next);
    });

// *+*+*+*+*+**+*+*+*+*+**+*+*+*+*+**+*+*
// *+*+*+*+*+* DYNAMIC ROUTES *+*+*+*+*+* 
// *+*+*+*+*+*  GET & DELETE *+*+*+*+**+*
bookmarksRouter

    .route('/bookmarks/:id')

    .get((req, res, next) => {
        const { id } = req.params;
        const knexInstance = req.app.get('db');
        console.log(id)

        BookmarksService.getBookmarkById(knexInstance, id)
            .then(bookmark => {
                if (!bookmark) {
                    logger.error(`Bookmark with id "${id}" not found`);
                    return res
                        .status(404)
                        .send(`Bookmark not found`);
                }
                res
                    .json(bookmark)
            })
            .catch(next)
    });

module.exports = bookmarksRouter;