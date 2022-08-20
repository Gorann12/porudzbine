SET TIME ZONE 'Europe/Belgrade';

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

CREATE TABLE sto (
    sto_oznaka TEXT PRIMARY KEY
);

CREATE TABLE porudzbina (
    porudzbina_id serial PRIMARY KEY,
    porudzbina_napomena TEXT NULL,
    porudzbina_korisnik_id INT NOT NULL,
    porudzbina_sto_id TEXT NOT NULL,
    porudzbina_status TEXT NOT NULL default 'PRIMLJENO',
    porudzbina_kreirana TIMESTAMP default (now()),

    CONSTRAINT porudzbina_korisnik_id_fk FOREIGN KEY (porudzbina_korisnik_id) REFERENCES korisnik(korisnik_id),
    CONSTRAINT porudzbina_sto_id_fk FOREIGN KEY (porudzbina_sto_id) REFERENCES sto(sto_oznaka)
);

CREATE TABLE porudzbina_jelo (
    pj_porudzbina_id INT NOT NULL,
    pj_jelo_id INT NOT NULL,
    pj_jelo_cena DECIMAL NOT NULL,
    pj_jelo_naziv TEXT NOT NULL,

    CONSTRAINT pj_porudzbina_id_fk FOREIGN KEY (pj_porudzbina_id) REFERENCES porudzbina(porudzbina_id),
    CONSTRAINT pj_jelo_id_fk FOREIGN KEY (pj_jelo_id) REFERENCES jelo(jelo_id)
);

-- Sifra za svakog korisnika je testSifra 
INSERT INTO korisnik (korisnik_ime, korisnik_email, korisnik_sifra, korisnik_uloga)
    VALUES ('Djordje Djordjevic', 'dj@gmail.com', '$2a$12$c9kp0O9IiFoJA5hycufU7OrbToXjzXhKG24wVVyHl6gIwssGOHfX6', 'ADMIN'), 
           ('Ivan Ivanovic', 'ivan@gmail.com', '$2a$12$c9kp0O9IiFoJA5hycufU7OrbToXjzXhKG24wVVyHl6gIwssGOHfX6', 'KORISNIK'),
           ('Milinko Milinkovic', 'milinko@gmail.com', '$2a$12$c9kp0O9IiFoJA5hycufU7OrbToXjzXhKG24wVVyHl6gIwssGOHfX6', 'KORISNIK');

INSERT INTO kategorija (kategorija_naziv, kategorija_opis, kategorija_rok)
    VALUES ('Dorucak', 'najvazniji obrok u toku dana', '9:00'),
           ('Rucak', NULL, '13:00'),
           ('Vecera', NULL, '18:00'),
           ('Pecenje', NULL, NULL);

INSERT INTO sto (sto_oznaka)
    VALUES ('11a'),
           ('11b'),
           ('12'),
           ('13'),
           ('13c');

INSERT INTO jelo (jelo_naziv, jelo_sastojci, jelo_cena, jelo_porcija, kategorija_id)
    VALUES ('Jaja i slanine', 'Jaja, slanina', 300.00, '2 jaja, 1 slanina', 1),
           ('Jagnjetina ispod saca', 'Jagnjetina, krompir', 1250.00, '500gr', 4),
           ('Saran na rostilju', 'Saran, bareni krompir', 1050, '700gr', 4),
           ('Pilav', 'Pirinac, belo meso', 300, '150gr i pirinac i meso', 2),
           ('Supa', 'Brokoli, rezanca, sargarepa', 125.50, NULL, 3);

INSERT INTO porudzbina (porudzbina_napomena, porudzbina_korisnik_id, porudzbina_sto_id) 
    VALUES (NULL, 2, '11a'),
           (NULL, 3, '11b'),
           ('Supa sa manje rezanaca', 2, '13c');

INSERT INTO porudzbina_jelo (pj_porudzbina_id, pj_jelo_id, pj_jelo_cena, pj_jelo_naziv)
    VALUES (1, 1, 300, 'Jaja i slanine'),
           (2, 2, 1250.50, 'Jagnjetina ispod saca'),
           (3, 2, 125, 'Supa'),
           (3, 2, 125, 'Jaja i slanine');