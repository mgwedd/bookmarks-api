module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://dunder-mifflin@localhost/bookmarks',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://dunder-mifflin@localhost/bookmarks-test',
    API_TOKEN: 'd9e40555-bbc2-4404-a7a0-a506d6ac88a4'
}