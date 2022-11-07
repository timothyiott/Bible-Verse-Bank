import React, { useState } from "react";

function Search(props) {
    let { baseUrl, setUrl, update, setUpdate, setViewBank } = props

    const [userResponse, setUserResponse] = useState("");

    const recordSearchText = (event) => {
        let value = event.target.value
        let result = value.replace(" ", "/")
        setUserResponse(result)
    };

    const editSearchUrlSearch = (event) => {
        setViewBank(false)
        setUrl(baseUrl + '/search/' + userResponse)
        setUpdate(!update)
    };

    const editSearchUrlSearchBank = (event => {
        setViewBank(true)
        setUrl(baseUrl + '/search/selected-verses')
        setUpdate(!update)
    })

    const editSearchUrlDelete = (event => {
        setUrl(baseUrl + '/delete/selected-verses')
        setUpdate(!update)
    })

    return (
        <div className='Search'>
            <button
                className='button2'
                onClick={editSearchUrlDelete}
            >
                Delete Bank
            </button>
            <input id="search-field"
                type="text"
                placeholder="Enter your answer!"
                onChange={recordSearchText}
            />
            <button 
                className='button2' 
                onClick={editSearchUrlSearch}
            >
                Search
            </button>
            <button
                className='button2'
                onClick={editSearchUrlSearchBank}
            >
                View Bank
            </button>
        </div>
    )
}

export default Search