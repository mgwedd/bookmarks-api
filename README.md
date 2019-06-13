# Bookmarks API Server

## Set up

You will need to configure [the Bookmarks client](https://github.com/Thinkful-Ed/bookmarks-react-client/tree/static_version/src/bookmarkApp) to properly interact with this server. For example, it will need to access the correct port on localhost, or, if you deploye to Heroku, it will need to point there. You will also need to take care that the Bookmarks client uses the UUID API Token set on the server. One is given in config.js for testing, so just use that in the Auth header of the requests the Bookmarks client sends. 

Happy Bookmarking!

## Scripts

Start the app: `npm start`

Start nodemon for the app: `npm run dev`

Run tests: `npm test`

Run debugger: `npm debug`

## Deploying

When the new project is ready for deployment, add a new Heroku app with `heroku create`. This will make a new git remote called "heroku". Then `npm run deploy`, which will push to this remote's master branch after auditing your packages (a predeploy script).
