import React, { useState, useEffect } from "react";
import Search from "./components/Search"
import Result from "./components/Result"

function App() {
  const baseUrl = 'http://localhost:8000'

  const [viewBank, setViewBank] = useState(false)
  const [url, setUrl] = useState('')
  const [resultData, setResultData] = useState([])
  const [update, setUpdate] = useState(false)
  const [updateBank, setUpdateBank] = useState(false)

  useEffect(() => {
    async function fetchData(){
      let response = await fetch(url)
      let data = await response.json()
      console.log(data)
      setResultData(data)
    }

    fetchData()
  }, [update])

  useEffect(() => {
    async function fetchData(){
      let response = await fetch(url)
      let data = await response.json()
    }
    fetchData()
  }, [updateBank])

  return (
    <div className="App">
      <h1 className="App-header">
        Bible Verse Bank
      </h1>
      <Search baseUrl={baseUrl} setUrl={setUrl} update={update} setUpdate={setUpdate} setViewBank={setViewBank} />
      <Result resultData={resultData} baseUrl={baseUrl} setUrl={setUrl} updateBank={updateBank} setUpdateBank={setUpdateBank} viewBank={viewBank} update={update} setUpdate={setUpdate}/>
    </div>
  );
}

export default App;
