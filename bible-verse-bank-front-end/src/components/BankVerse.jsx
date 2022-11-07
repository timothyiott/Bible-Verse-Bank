import React from 'react'

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

function BankVerse(props) {
    let { verseData, baseUrl, setUrl, updateBank, setUpdateBank, update, setUpdate } = props;

    let book = books[verseData.book - 1];
    let chapter = verseData.chapter;
    let verse = verseData.verse;
    let text = verseData.text;
    let verseId = verseData.verse_id
    let isHighlighted = verseData.is_highlighted

    const editSearchUrlToDelete = (event) => {
        setUrl(baseUrl + '/delete/' + verseId)
        setUpdateBank(!updateBank)
    };

    const editSearchUrlToHighlight = (event) => {
        setUrl(baseUrl + '/highlight/' + verseId)
        setUpdateBank(!updateBank)
    };

    const editSearchUrlToUnHighlight = (event) => {
        setUrl(baseUrl + '/un-highlight/' + verseId)
        setUpdateBank(!updateBank)
    };

    let verseClassName = isHighlighted ? "Highlighted-Verse" : "Verse"

    let highlightButton = isHighlighted ? 
        <button className='button' onClick={editSearchUrlToUnHighlight}>Un-Highlight Verse</button>:
        <button className='button' onClick={editSearchUrlToHighlight}>Highlight Verse</button>

    return (
        <div className={verseClassName}>
            <p>{`${book} ${chapter}:${verse} ${text}`}</p>
            <button className='button' onClick={editSearchUrlToDelete}>Delete From Bank</button>
            {highlightButton}
        </div>
    )
}

export default BankVerse