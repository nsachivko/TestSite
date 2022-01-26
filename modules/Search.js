import React, { useState, useEffect, createContext } from "react"

// To connect elastic search API
import * as ElasticAppSearch from "@elastic/app-search-javascript"
// Search-Components, components for searchbar render function
import DisplayResults from "./Search-Components/DisplayResults"
import AutocompleteSuggestions from "./Search-Components/AutocompleteSuggestions"
import { formControlClasses } from "@mui/material"

const textFillingSuggestions = require("./Search-Components/TextFillingSuggestions")

// Searchbar
const Search = () => {
  // Hold search input value
  const [getInput, setInput] = useState()

  // After finding the results, the user will be returned to the first page
  const [pageNumber, setPageNumber] = useState(1)

  // Holds results of search
  const [searchResults, setSearchResults] = useState([])

  // Holds results of search for autocomplete system
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([])

  // Adds a class to display a list of suggestions
  const [suggestionsDisplay, setSuggestionsDisplay] = useState("")

  // Connection to web crawler
  // Can be found at Enterprise Search/App Search/Credentials
  const client = ElasticAppSearch.createClient({
    searchKey: "search-6cujcf6k56b9itogx4nuw8pr",
    endpointBase: "https://my-test-app.ent.us-east4.gcp.elastic-cloud.com",
    engineName: "oxfordproperties-search-engine",
  })

  // Set or expected values from search
  let options = {
    // We can search by many attributes, (example: title, url, headings)
    search_fields: { title: {}, url: {} },
    result_fields: {
      id: { raw: {} },
      title: { raw: {} },
      url: { raw: {} },
      headings: { raw: {} },
      body_content: { raw: {} },
    },
    // Sets number of pages that we want to render by default (we can change this value is future)
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
      }
      if (newResult.title.length > 46) {
        newResult.title = newResult.title.substr(0, 46)
        newResult.title += "..."
      }
      setAutoCompleteSuggestions((autoCompleteSuggestions) => [
        ...autoCompleteSuggestions,
        newResult,
      ])
    }
  }

  // Searching process
  // Adds data to search result array
  // Fix title for news
  const searchData = (param, addFunction) => {
    if (param.length !== 0) {
      setAutoCompleteSuggestions([])
      // param is the word to search
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
            if (
              result.data.title.raw.replace(/\|[^.]+$/, "").trim() ===
              "310.MAXX"
            ) {
              result.data.title.raw = result.data.headings.raw[3].replace(
                "Welcome to",
                ""
              )
            }
            addFunction(result)
          })
        })
        .catch((error) => {
          console.log(`error: ${error}`)
        })
    }
  }

  // Sets searchbar input
  const setSearchInput = () => {
    setInput(
      document
        .getElementById("free-solo-demo")
        .value.replace(/^\s/, "")
        .replace("  ", " ")
    )
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
    setSuggestionsDisplay("")
    searchData(
      document.getElementById("free-solo-demo").value,
      addAutocompleteResult
    )
  }, [getInput])

  // Sets autocomplete suggestions
  // Works as trigger
  // Data formating
  const autoCompleteOptions = () => {
    return autoCompleteSuggestions.filter(
      (v, i, a) => a.findIndex((t) => t.title === v.title) === i
    )
  }

  // - The value attribute is set to getInput, which will be the input box that the user types in.
  // - onChange={() => setSearchInput(event.target.value)} sets up an event listener for
  // - sets getInput value.
  // - when input changes useEffect reacts and start search and gives auto suggestions
  // - onClick={() => startSearch(event.target.value)} start main search all data
  // - for getInput
  return (
    <div
      className="py-20 h-screen px-2"
      style={{ minHeight: "100%" }}
      id="container"
    >
      <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div className="flex display-flex">
          <div className="flex justify-center">
            <div className="xl:w-96">
              <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                <div className="flex justify-center">
                  <div
                    class="editable"
                    placeholder={textFillingSuggestions.formatTextCompleter(
                      autoCompleteSuggestions,
                      getInput
                    )}
                  >
                    <input
                      onBlur={() =>
                        setTimeout(() => {
                          setSuggestionsDisplay("none")
                        }, 150)
                      }
                      class="searchbar-input"
                      placeholder="Search"
                      id="free-solo-demo"
                      value={getInput}
                      onChange={() => setSearchInput()}
                      type="search"
                    />
                  </div>
                  <button
                    onClick={() => startSearch(event.target.value)}
                    className="btn inline-block px-9 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
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
        <div style={{ display: suggestionsDisplay }}>
          <AutocompleteSuggestions
            autoCompleteSuggestions={autoCompleteOptions()}
            setInput={setInput}
            setSuggestionsDisplay={setSuggestionsDisplay}
            getInput={getInput}
          ></AutocompleteSuggestions>
        </div>
        <DisplayResults searchResults={searchResults} pageNumber={pageNumber} />
      </div>
    </div>
  )
}
export default Search
