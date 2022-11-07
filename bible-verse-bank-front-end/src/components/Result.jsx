import React from 'react';
import Verse from "./Verse";
import BankVerse from './BankVerse';

function Result(props) {
    let { resultData, viewBank, baseUrl, setUrl, updateBank, setUpdateBank, update, setUpdate } = props;

    let verses = resultData.map((verseData) => {
        if(viewBank){
            return <BankVerse key={verseData.verse_id} verseData={verseData} baseUrl={baseUrl} setUrl={setUrl} updateBank={updateBank} setUpdateBank={setUpdateBank} update={update} setUpdate={setUpdate}/>
        } else {
            return <Verse key={verseData.verse_id} verseData={verseData} baseUrl={baseUrl} setUrl={setUrl} updateBank={updateBank} setUpdateBank={setUpdateBank} />
        }
    })

    return (
        <div className='Result'>
           {verses}
        </div>
    )
}

export default Result