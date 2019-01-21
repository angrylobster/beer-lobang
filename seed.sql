DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT   
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    place_id TEXT,
    user_id INTEGER
)

CREATE TABLE beers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    user_id INTEGER,
    location_id INTEGER,
    CONSTRAINT fk_locations
        FOREIGN KEY (location_id)
        REFERENCES locations(id)
        ON DELETE CASCADE
);
