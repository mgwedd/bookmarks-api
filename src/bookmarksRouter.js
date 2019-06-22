const express = require('express');
const bodyParser = express.json();
const logger = require('./logger');
const xss = require('xss');
const BookmarksRouter = express.Router();
const BookmarksService = require('./BookmarksService');

const serializeBookmark = bookmark => ({
    id: bookmark.id,
    title: bookmark.title,
    url: xss(bookmark.url),
    description: xss(bookmark.description),
    rating: bookmark.rating,
});

// *+*+*+*+*+**+*+*+*+*+**+*+*+*+*+**+*+
// *+*+*+*+*+* STATIC ROUTES *+*+*+*+*+*
// *+*+*+*+*+*  GET & POST *+*+*+*+**+*+

BookmarksRouter

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
        const requiredFields = [title, url, description, rating];

        requiredFields.forEach( (field) => {
            if (!field) {
                logger.error(`${field} is required`);
                return res
                    .status(400)
                    .send('Invalid submission');
            }
        });

        const newBookmark = serializeBookmark({
            title,
            url,
            description, 
            rating
        });
        
        // POST the new bookmark to the database.
        const knexInstance = req.app.get('db');

        BookmarksService.insertBookmark(knexInstance, newBookmark)
            .then(bookmark => {
                if (!bookmark) {
                    logger.error(`Failed to insert ${newBookmark} into db`)
                    return res.status(422).json({
                        error: { message: `Unable to create bookmark` }
                    });
                }

                res
                    .status(201)
                    .location(`http://localhost:8000/bookmark/${bookmark.id}`)
                    .json(serializeBookmark(bookmark));
            })
            .catch(next);
    });

// *+*+*+*+*+**+*+*+*+*+**+*+*+*+*+**+*+*
// *+*+*+*+*+* DYNAMIC ROUTES *+*+*+*+*+* 
// *+*+*+*+*+*  GET & DELETE *+*+*+*+**+*
BookmarksRouter

    .route('/bookmarks/:id')

    .get((req, res, next) => {
        const { id } = req.params;
        const knexInstance = req.app.get('db');

        BookmarksService.getBookmarkById(knexInstance, id)
            .then(bookmark => {
                if (!bookmark) {
                    logger.error(`Bookmark with id "${id}" not found`);
                    return res
                        .status(404)
                        .send(`Bookmark not found`);
                }
                res
                    .json(serializeBookmark(bookmark))
            })
            .catch(next)
    })

    .delete((req, res, next) => {
        BookmarksService.deleteBookmark(
          req.app.get('db'),
          req.params.id
        )
          .then(numRowsAffected => {
            res.json(`Bookmark deleted successfully.`)
            res.status(204).end()
          })
          .catch(next)
    });

module.exports = BookmarksRouter;