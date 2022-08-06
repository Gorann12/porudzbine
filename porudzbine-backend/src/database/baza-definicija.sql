CREATE TABLE users (
    id serial PRIMARY KEY,
    ime TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    sifra TEXT NOT NULL,
    uloga TEXT CHECK (uloga in ('ADMIN', 'KORISNIK'))
);

CREATE TABLE posts (
    id serial PRIMARY KEY,
    opis TEXT NULL,
    naslov TEXT NOT NULL
);

-- Sifra za svakog korisnika je testSifra 
INSERT INTO users (id, ime, email, sifra, uloga)
    VALUES (1, 'Djordje Djordjevic', 'dj@gmail.com', '$2a$12$c9kp0O9IiFoJA5hycufU7OrbToXjzXhKG24wVVyHl6gIwssGOHfX6', 'ADMIN'), 
           (2, 'Ivan Ivanovic', 'ivan@gmail.com', '$2a$12$c9kp0O9IiFoJA5hycufU7OrbToXjzXhKG24wVVyHl6gIwssGOHfX6', 'KORISNIK'),
           (3, 'Milinko Milinkovic', 'milinko@gmail.com', '$2a$12$c9kp0O9IiFoJA5hycufU7OrbToXjzXhKG24wVVyHl6gIwssGOHfX6', 'KORISNIK');

INSERT INTO posts (id, opis, naslov)
    VALUES (1, 'Opis ovog posta prvog posta', 'prvi post'), 
           (2, 'Opis ovog drugog posta', 'drugi post'), 
           (3, 'opis ovog treceg posta', 'treci post');