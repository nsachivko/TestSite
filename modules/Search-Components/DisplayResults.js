import React, { useEffect, useState } from "react"
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate'

const DisplayResults = ({ searchResults, getInput }) => {
  let isEmpty
  let titleColor = 'blue'
  if (typeof getInput !== "undefined") {
    if (searchResults.length > 0 && getInput.length > 0) {
      isEmpty = true
    } else {
      isEmpty = false
    }
  } else {
    isEmpty = false
  }
  return (
    <div className="mt-5">
      <h1 className="text-2xl font-semibold">Search Results</h1>
      {isEmpty &&
        searchResults.map((searchResult) => {
          {
            if (searchResult.title.trim() !== "404") {
              return (
                <div class="mt-5 p-2 rounded">
                  <div>
                    <a style={{ color: titleColor}} href={searchResult.url}>
                      {searchResult.title}
                    </a>
                  </div>
                  <div>
                    <a
                      style={{ color: "grey", fontStyle: "italic" }}
                      href={searchResult.url}
                    >
                      {searchResult.url}
                    </a>
                  </div>
                </div>
              )
            }
          }
        })}
      {!isEmpty && (
        <div class="mt-5 p-2 rounded">
          <strong>No results found</strong>
        </div>
      )}
    </div>
  )

}

export default DisplayResults



