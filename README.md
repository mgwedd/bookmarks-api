# Express Boilerplate — Exciting! 

This is a boilerplate project for new Express projects.

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to local: `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm i`
5. Move the example Environment file `example.env` to `.env`, which will be ignored by git and read by the express server `mv example.env .env`. Adjust those environment variables as needed.
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the app: `npm start`

Start nodemon for the app: `npm run dev`

Run tests: `npm test`

Run debugger: `npm debug`

## Deploying

When the new project is ready for deployment, add a new Heroku app with `heroku create`. This will make a new git remote called "heroku". Then `npm run deploy`, which will push to this remote's master branch after auditing your packages (a predeploy script).
