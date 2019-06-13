const express = require('express')
const bookmarksRouter = express.Router()
const bodyParser = express.json()
const bookmarks = require('../bookmarks.js')
const uuid = require('uuid/v4')
const logger = require('./logger')

// *+*+*+*+*+**+*+*+*+*+**+*+*+*+*+**+*+
// *+*+*+*+*+* STATIC ROUTES *+*+*+*+*+*
// *+*+*+*+*+*  GET & POST *+*+*+*+**+*+
bookmarksRouter

    .route('/bookmarks')

    .get((req, res) => {
        res
            .json(bookmarks)
    })

    .post(bodyParser, (req, res)=> {
        
        const { title, url, description, rating } = req.body

        if (!title) {
            logger.error(`Title is required`)
            return res
                .status(400)
                .send('Invalid data')
        }
            
        if (!url) {
            logger.error(`URL is required`)
            return res
                .status(400)
                .send('Invalid data')
        }

        if (!description) {
            logger.error(`Description is required`)
            return res
                .status(400)
                .send('Invalid data')
        }
        
        if (!rating) {
            logger.error(`Rating is required`)
            return res
                .status(400)
                .send('Invalid data')
        }

        const id = uuid()
    
        const bookmark = {
            id,
            title,
            url,
            description, 
            rating
        };
    
        bookmarks.push(bookmark)
        
        res
            .status(201)
            .location(`http://localhost:8000/bookmark/${id}`)
            .json(bookmark)
    })

// *+*+*+*+*+**+*+*+*+*+**+*+*+*+*+**+*+*
// *+*+*+*+*+* DYNAMIC ROUTES *+*+*+*+*+* 
// *+*+*+*+*+*  GET & DELETE *+*+*+*+**+*
bookmarksRouter

    .route('/bookmarks/:id')

    .get((req, res) => {
        const { id } = req.params

        const bookmark = bookmarks.find(bookmark => bookmark.id === id)

        // is there a bookmark with the requested ID? If not, return 404.
        if (!bookmark) {
            logger.error(`Bookmark with id ${id} not found`)
            return res
                .status(404)
                .send(`Bookmark not found`)
        }

        res
            .json(bookmark)
    })

    // Delete endpoint isn't working.... DEBUG.
    .delete((req, res) => {

        const { id } = req.params
        const bookmark = bookmarks.find(bookmark => bookmark.id === id)
        const bookmarkIndex = bookmarks.indexOf(bookmark)

        if (bookmarkIndex === -1) {
            logger.error(`Bookmark with id ${id} not found`)
            return res
                .status(404)
                .send('Bookmark not found')
        }

        logger.error(`Bookmark with id ${id} not found`)
        bookmarks.slice(bookmarkIndex, 1)

        res
            .status(204)
            .send('Bookmark deleted')
    })

module.exports = bookmarksRouter