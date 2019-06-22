CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    url VARCHAR(2083) NOT NULL,
    description TEXT, 
    rating NUMERIC CHECK(rating > 0 AND rating < 6) NOT NULL
);