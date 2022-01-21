import React, { useState, useEffect } from "react"
import * as ElasticAppSearch from "@elastic/app-search-javascript"
import DisplayResults from "./Search-Components/DisplayResults"

// Mui for input and autocomplete
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Autocomplete from "@mui/material/Autocomplete"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"

const Search = () => {
  // Hold search input value
  const [getInput, setInput] = useState()

  // After finding the results, the user will be returned to the first page
  const [pageNumber, setPageNumber] = useState(1)

  // Holds results of search
  const [searchResults, setSearchResults] = useState([])

  // Holds results of search for autocomplete system
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([])

  // Connection to web crawler
  const client = ElasticAppSearch.createClient({
    searchKey: "search-6cujcf6k56b9itogx4nuw8pr",
    endpointBase: "https://my-test-app.ent.us-east4.gcp.elastic-cloud.com",
    engineName: "oxfordproperties-search-engine",
  })

  // Set or expected values from search
  let options = {
    search_fields: { title: {}, url: {} },
    result_fields: {
      id: { raw: {} },
      title: { raw: {} },
      url: { raw: {} },
      headings: { raw: {} },
      body_content: { raw: {} },
    },
    page: {
      size: 10,
    },
  }

  // Adds resuls to array (searchResults)
  // Finds up to 100 records
  const addResult = (param) => {
    if (
      param
        .getRaw("title")
        .replace(/\|[^.]+$/, "")
        .trim() !== "404" &&
      !param.getRaw("url").match("/errors/")
    ) {
      const newResult = {
        id: param.getRaw("id"),
        title: param.getRaw("title").replace(/\|[^.]+$/, ""),
        url: param.getRaw("url"),
        headings: param.getRaw("headings"),
        body_content: param.getRaw("body_content"),
      }
      setSearchResults((searchResults) => [...searchResults, newResult])
    }
  }

  // Adds autocomplete resuls to array (autoCompleteSuggestions)
  // Find 10 records
  const addAutocompleteResult = (param) => {
    if (
      param
        .getRaw("title")
        .replace(/\|[^.]+$/, "")
        .trim() !== "404" &&
      getInput.trim() != ""
    ) {
      const newResult = {
        title: param.getRaw("title").replace(/\|[^.]+$/, ""),
        //title: param.data.headings.raw[1],
      }
      if (newResult.title.length > 50) {
        newResult.title = newResult.title.substr(0, 50)
        newResult.title += "..."
      }
      // setAutoCompleteSuggestions((autoCompleteSuggestions) => [
      //   ...autoCompleteSuggestions,
      //   newResult,
      // ])
      setAutoCompleteSuggestions((autoCompleteSuggestions) => [
        ...autoCompleteSuggestions,
        newResult,
      ])
      // const temp = autoCompleteSuggestions.filter(
      //   (v, i, a) => a.findIndex((t) => t.title === v.title) === i
      // )
    }
  }

  // Searching process
  // Adds data to search result array
  // Fix title for news
  const searchData = (param, addFunction) => {
    setAutoCompleteSuggestions([])
    client
      .search(param, options)
      .then((resultList) => {
        resultList.results.forEach((result) => {
          if (
            result
              .getRaw("title")
              .replace(/\|[^.]+$/, "")
              .trim() === "News Detail"
          ) {
            result.data.title.raw = result.data.headings.raw[1]
          }
          addFunction(result)
        })
      })
      .catch((error) => {
        console.log(`error: ${error}`)
      })
  }

  // Sets searchbar input
  const setSearchInput = () => {
    setInput(document.getElementById("free-solo-demo").value)
  }

  // Controller of search process
  // Clears autoCompleteSuggestions and searchResults
  // Moves user to first page
  const startSearch = () => {
    options.page.size = 100
    setPageNumber(1)
    setSearchResults([])
    setAutoCompleteSuggestions([])
    searchData(document.getElementById("free-solo-demo").value, addResult)
  }

  // Sets autocomplete suggestions
  useEffect(() => {
    options.page.size = 10
    setAutoCompleteSuggestions([])

    // Passing autocomplete setter
    searchData(
      document.getElementById("free-solo-demo").value,
      addAutocompleteResult
    )
  }, [getInput])

  // Sets autocomplete suggestions
  // Works as trigger
  const autoCompleteOptions = () => {
    return autoCompleteSuggestions.filter(
      (v, i, a) => a.findIndex((t) => t.title === v.title) === i
    )
  }

  return (
    <div
      className="py-20 h-screen px-2"
      style={{ minHeight: "100%" }}
      id="container"
    >
      <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div className="flex display-flex">
          {/* <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={autoCompleteOptions()}
              renderInput={(params) => (
                <TextField
                  value={getInput}
                  onChange={() => setSearchInput(event.target.value)}
                  {...params}
                  label="How can we help you?"
                />
              )}
            />
          </Stack> */}
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                <div className="flex justify-center">
                  <input
                    id="free-solo-demo"
                    value={getInput}
                    onChange={() => setSearchInput(event.target.value)}
                    type="search"
                    className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon3"
                  ></input>
                  <button
                    onClick={() => startSearch(event.target.value)}
                    className="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    type="button"
                    id="button-addon3"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute py-2 bg-white bg-gray-100 divide-y divide-gray-600 rounded-md shadow-xl w-44">
          {autoCompleteOptions().map((value) => {
            return (
              <a
                onClick={() => setInput(value.title)}
                class="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-400 hover:text-white"
              >
                {value.title}
              </a>
            )
          })}
        </div>
        <DisplayResults
          searchResults={searchResults}
          getInput={getInput}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  )
}
export default Search
