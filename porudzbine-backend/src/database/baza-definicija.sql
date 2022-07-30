CREATE TABLE users (
    id serial PRIMARY KEY,
    email varchar(100) UNIQUE NOT NULL
);

CREATE TABLE posts (
    id serial PRIMARY KEY,
    opis varchar(200) NULL,
    naslov varchar(100) NOT NULL
);

INSERT INTO users (id, email)
    VALUES (1, 'tmp@gmail.com'), (2, 'user@gmail.com'), (3, 'anotheruser@gmail.com');

INSERT INTO posts (id, opis, naslov)
    VALUES (1, 'Opis ovog posta prvog posta', 'prvi post'), (2, 'Opis ovog drugog posta', 'drugi post'), (3, 'opis ovog treceg posta', 'treci post');