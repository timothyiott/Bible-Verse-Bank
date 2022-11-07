//DEPENDENCIES
let express = require("express");
let {Client} = require("pg");
let cors = require("cors");
let app = express();

// CONNECTION STRING
// This defines the route needed to get to the postgres database. 
const client = new Client({
    connectionString: "postgresql://postgres:mysecretpassword@localhost:5432/kjv_bible_bank_db"
});

const PORT = 8000
client.connect();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// array containing all the books of the Bible
var books = [
    'Genesis',         'Exodus',          'Leviticus',     'Numbers',
    'Deuteronomy',     'Joshua',          'Judges',        'Ruth',
    '1 Samuel',        '2 Samuel',        '1 Kings',       '2 Kings',
    '1 Chronicles',    '2 Chronicles',    'Ezra',          'Nehemiah',
    'Esther',          'Job',             'Psalm',         'Proverbs',
    'Ecclesiastes',    'Song of Solomon', 'Isaiah',        'Jeremiah',
    'Lamentations',    'Ezekiel',         'Daniel',        'Hosea',
    'Joel',            'Amos',            'Obadiah',       'Jonah',
    'Micah',           'Nahum',           'Habakkuk',      'Zephaniah',
    'Haggai',          'Zechariah',       'Malachi',       'Matthew',
    'Mark',            'Luke',            'John',          'Acts',
    'Romans',          '1 Corinthians',   '2 Corinthians', 'Galatians',
    'Ephesians',       'Philippians',     'Colossians',    '1 Thessalonians', 
    '2 Thessalonians', '1 Timothy',       '2 Timothy',     'Titus',
    'Philemon',        'Hebrews',         'James',         '1 Peter',
    '2 Peter',         '1 John',          '2 John',        '3 John',
    'Jude',            'Revelation'
];

//ROUTES

//DEFAULT ROUTE
app.get('/', (req, res) => {
    res.send()
})

// GET ALL VERSES THAT ARE IN THE SELECTED VERSES BANK
app.get('/search/selected-verses', (req, res) => {
    client.query(`
        SELECT kjv_bible.verse_id, kjv_bible.book, kjv_bible.chapter, kjv_bible.verse, kjv_bible.text, selected_verses.is_highlighted 
        FROM kjv_bible INNER JOIN selected_verses ON kjv_bible.verse_id=selected_verses.verse_id
        ORDER BY kjv_bible.verse_id ASC;`)
    .then(data => {
        res.send(data.rows);
    })
    .catch(error => {
        res.send(error)
    })
})

// DELETE ALL VERSES THAT ARE IN THE SELECTED VERSES BANK
app.get('/delete/selected-verses', (req, res) => {
    client.query(`DELETE FROM selected_verses;`)
    .then(data => {
        res.send(data.rows);
    })
    .catch(error => {
        res.send(error);
    })
})

// SEARCH BY ONE WORD
// this route takes in a word and searches the database for every reference of that word in all the verses of the Bible text. 
app.get('/search/:word1', (req, res) => {
    let word1 = req.params.word1;
    client.query(`
        SELECT kjv_bible.verse_id, kjv_bible.book, kjv_bible.chapter, kjv_bible.verse, kjv_bible.text, selected_verses.is_highlighted 
        FROM kjv_bible LEFT OUTER JOIN selected_verses ON kjv_bible.verse_id=selected_verses.verse_id 
        WHERE text ILIKE '%${word1}%' 
        ORDER BY kjv_bible.verse_id ASC;`)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        res.send(error);
    })
})

// SEARCH BY TWO WORDS
app.get('/search/:word1/:word2', (req, res) => {
    let word1 = req.params.word1;
    let word2 = req.params.word2;
    client.query(`
        SELECT kjv_bible.verse_id, kjv_bible.book, kjv_bible.chapter, kjv_bible.verse, kjv_bible.text, selected_verses.is_highlighted 
        FROM kjv_bible LEFT OUTER JOIN selected_verses ON kjv_bible.verse_id=selected_verses.verse_id 
        WHERE text ILIKE '%${word1}%' AND text ILIKE '%${word2}%'
        ORDER BY kjv_bible.verse_id ASC;`)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        res.send(error);
    })
})

// SEARCH BY THREE WORDS
app.get('/search/:word1/:word2/:word3', (req, res) => {
    let word1 = req.params.word1;
    let word2 = req.params.word2;
    let word3 = req.params.word3;
    client.query(`
        SELECT kjv_bible.verse_id, kjv_bible.book, kjv_bible.chapter, kjv_bible.verse, kjv_bible.text, selected_verses.is_highlighted 
        FROM kjv_bible LEFT OUTER JOIN selected_verses ON kjv_bible.verse_id=selected_verses.verse_id 
        WHERE text ILIKE '%${word1}%' AND text ILIKE '%${word2}%' AND text ILIKE '%${word3}%' 
        ORDER BY kjv_bible.verse_id ASC;`)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        res.send(error);
    })
})

// SEARCH BY FOUR WORDS
app.get('/search/:word1/:word2/:word3/:word4', (req, res) => {
    let word1 = req.params.word1;
    let word2 = req.params.word2;
    let word3 = req.params.word3;
    let word4 = req.params.word4;
    client.query(`
        SELECT kjv_bible.verse_id, kjv_bible.book, kjv_bible.chapter, kjv_bible.verse, kjv_bible.text, selected_verses.is_highlighted 
        FROM kjv_bible LEFT OUTER JOIN selected_verses ON kjv_bible.verse_id=selected_verses.verse_id 
        WHERE text ILIKE '%${word1}%' AND text ILIKE '%${word2}%' AND text ILIKE '%${word3}%' AND text ILIKE '%${word4}%'
        ORDER BY kjv_bible.verse_id ASC;`)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        res.send(error);
    })
})

// ADD VERSE INTO THE SELECTED VERSES BANK
// This route takes in a verse_id and then adds that value into the selected_verses table. 
app.get('/add/:verse_id', (req, res) => {
    let verseId = req.params.verse_id

    client.query(`INSERT INTO selected_verses (verse_id, is_highlighted) VALUES (${verseId}, 0);`)
    .then(data => {
        res.send(data.rows);
    })
    .catch(error => {
        res.send(error);
    })
})

// DELETE A SELECTED VERSE FROM THE SELECTED VERSE BANK
app.get('/delete/:verse_id', (req, res) => {
    let verseId = req.params.verse_id;

    client.query(`DELETE FROM selected_verses WHERE verse_id = ${verseId};`)
    .then(data => {
        res.send(data.rows)
    })
    .catch(error => {
        res.send(error)
    })
})

// HIGHLIGHT A SELECTED VERSE IN THE SELECTED VERSE BANK
app.get('/highlight/:verse_id', (req, res) => {
    let verseId = req.params.verse_id;

    client.query(`UPDATE selected_verses SET is_highlighted = 1 WHERE verse_id = ${verseId};`)
    .then(data => {
        res.send(data.rows)
    })
    .catch(error => {
        res.send(error)
    })
})

// UN-HIGHLIGHT A SELECTED VERSE IN THE SELECTED VERSE BANK
app.get('/un-highlight/:verse_id', (req, res) => {
    let verseId = req.params.verse_id;

    client.query(`UPDATE selected_verses SET is_highlighted = 0 WHERE verse_id = ${verseId};`)
    .then(data => {
        res.send(data.rows)
    })
    .catch(error => {
        res.send(error)
    })
})

// // SEARCH BY VERSE
// // This route takes in a book, chapter, and verse as part of the url and queries the database for that specific verse. 
// app.get('/search/:book/:chapter/:verse', (req, res) => {
//     let book = req.params.book;
//     let chapter = req.params.chapter;
//     let verse = req.params.verse;

//     console.log(books.indexOf(book) + 1, chapter, verse)

//     client.query(`SELECT * FROM kjv_bible WHERE book = ${books.indexOf(book) + 1} AND chapter = ${chapter} AND verse = ${verse};`)
//     .then(data => {
//         console.log(data.rows)
//         res.send(data.rows)
//     })
//     .catch(error => {
//         res.send(error);
//     })

// })

// // SEARCH BY CHAPTER 
// // This route takes in a book and chapter as part of the url and queries the database for that specific verse. 
// app.get('/search/:book/:chapter', (req, res) => {
//     let book = req.params.book;
//     let chapter = req.params.chapter;

//     client.query(`SELECT * FROM kjv_bible WHERE book = ${books.indexOf(book) + 1} AND chapter = ${chapter};`)
//     .then(data => {
//         res.send(data.rows)
//     })
//     .catch(error => {
//         res.send(error);
//     })
// })

// MIDDLEWARE used for error catching. 
app.use((req, res, er) => {
    res.status(404).send(er);
})

app.listen(PORT, console.log(`listening on port ${PORT}`));
