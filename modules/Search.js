import React, { useState } from "react"
import { renderHTML } from "../agility/utils"
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector"
import parse from "html-react-parser"
const elasticsearch = require("elasticsearch")
import * as ElasticAppSearch from "@elastic/app-search-javascript"

const Search = (props) => {
  const [getInput, setInput] = useState()
  const [searchResults, setSearchResults] = useState([])

  const client = ElasticAppSearch.createClient({
    searchKey: "search-6cujcf6k56b9itogx4nuw8pr",
    endpointBase: "https://my-test-app.ent.us-east4.gcp.elastic-cloud.com",
    engineName: "test-engine",
  })

  const options = {
    search_fields: { title: {} },
    result_fields: { id: { raw: {} }, title: { raw: {} }, url: { raw: {} } },
  }

  const addResult = (param) => {
    const newResult = {
      id: param.getRaw("id"),
      title: param.getRaw("title"),
      url: param.getRaw("url"),
    }
    setSearchResults([...searchResults, newResult])
  }

  const searchData = (param) => {
    client
      .search(param, options)
      .then((resultList) => {
        resultList.results.forEach((result) => {
          addResult(result)
        })
      })
      .catch((error) => {
        console.log(`error: ${error}`)
      })
  }

  const clearSearchResults = () => {
    setSearchResults([])
  }

  const setSearchInput = (param) => {
    setInput(param)
    clearSearchResults()
    searchData(getInput)
  }

  return (
    <div class="py-20 h-screen bg-gray-300 px-2">
      <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <input
          value={getInput}
          onChange={() => setSearchInput(event.target.value)}
          type="text"
          class="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
          placeholder="Search anything..."
        ></input>

        <div className="mt-1">
          {searchResults.map((searchResult) => {
            if (getInput.length > 0)
              return (
                <div className="mt-1">
                  <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                    <a href={searchResult.url}>{searchResult.title}</a>
                  </div>
                </div>
              )
          })}
        </div>
      </div>
    </div>
  )
}

export default Search
