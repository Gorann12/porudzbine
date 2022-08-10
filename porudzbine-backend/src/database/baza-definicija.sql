-- Napravi u repository sloju neke DBKorisnikModel i to uvek pre vracanja kovertuj u KorisnikModel, tako uradi za sve ove modele
CREATE TABLE korisnik (
    korisnik_id serial PRIMARY KEY,
    korisnik_ime TEXT NOT NULL,
    korisnik_email TEXT UNIQUE NOT NULL,
    korisnik_sifra TEXT NOT NULL,
    korisnik_uloga TEXT CHECK (korisnik_uloga in ('ADMIN', 'KORISNIK'))
);

CREATE TABLE kategorija (
    kategorija_id serial PRIMARY KEY,
    kategorija_naziv TEXT NOT NULL,
    kategorija_opis TEXT NULL,
    kategorija_rok TIME NULL
);

CREATE TABLE jelo (
    jelo_id serial PRIMARY KEY,
    jelo_naziv TEXT NOT NULL,
    jelo_sastojci TEXT NOT NULL,
    jelo_porcija TEXT NULL,
    jelo_cena DECIMAL NOT NULL,
    kategorija_id INT NOT NULL,

    CONSTRAINT fk_kategorija
        FOREIGN KEY(kategorija_id)
        REFERENCES kategorija(kategorija_id)
        ON DELETE CASCADE
);

-- Sifra za svakog korisnika je testSifra 
INSERT INTO korisnik (korisnik_ime, korisnik_email, korisnik_sifra, korisnik_uloga)
    VALUES ('Djordje Djordjevic', 'dj@gmail.com', '$2a$12$c9kp0O9IiFoJA5hycufU7OrbToXjzXhKG24wVVyHl6gIwssGOHfX6', 'ADMIN'), 
           ('Ivan Ivanovic', 'ivan@gmail.com', '$2a$12$c9kp0O9IiFoJA5hycufU7OrbToXjzXhKG24wVVyHl6gIwssGOHfX6', 'KORISNIK'),
           ('Milinko Milinkovic', 'milinko@gmail.com', '$2a$12$c9kp0O9IiFoJA5hycufU7OrbToXjzXhKG24wVVyHl6gIwssGOHfX6', 'KORISNIK');

INSERT INTO kategorija (kategorija_naziv, kategorija_opis)
    VALUES ('Dorucak', 'najvazniji obrok u toku dana'),
           ('Rucak', NULL),
           ('Vecera', NULL);

INSERT INTO jelo (jelo_naziv, jelo_sastojci, jelo_cena, jelo_porcija, kategorija_id)
    VALUES ('Jaja i slanine', 'Jaja, slanina', 300.00, '2 jaja, 1 slanina', 1),
           ('Jagnjetina ispod saca', 'Jagnjetina, krompir', 1250.00, '500gr', 2),
           ('Supa', 'Brokoli, rezanca, sargarepa', 125.50, NULL, 3);