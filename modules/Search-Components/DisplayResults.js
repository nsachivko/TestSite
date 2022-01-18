import React, { useEffect, useState } from "react"

const DisplayResults = ({ searchResults, getInput }) => {
  let isEmpty
  let tempDomainUrl
  let headingsContent
  const titleColor = "#364A59"
  const searchResultsColor = "#24272A"
  const headingsContentColor = "#24272A"

  if (typeof getInput !== "undefined") {
    if (searchResults.length > 0 && getInput.length > 0) {
      isEmpty = true
    } else {
      isEmpty = false
    }
  } else {
    isEmpty = false
  }

  const extractDomain = (url) => {
    var result
    var match
    if (
      (match = url.match(
        /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
      ))
    ) {
      result = match[1]
      if ((match = result.match(/^[^\.]+\.(.+\..+)$/))) {
        result = match[1]
      }
    }
    return result
  }

  return (
    <div className="mt-5">
      <h1
        className="text-2xl font-semibold"
        style={{ color: searchResultsColor, fontWeight: "bold" }}
      >
        Search Results:{" "}
      </h1>
      {isEmpty &&
        searchResults.map((searchResult) => {
          {
            tempDomainUrl = extractDomain(searchResult.url)
            headingsContent = searchResult.headings[0] + " | "+ searchResult.headings[1]
            console.log(headingsContent)
            if (headingsContent.length > 50) {
              headingsContent = headingsContent.substr(0, 50)
              headingsContent += "..."
            }
            if (searchResult.title.trim() !== "404") {
              return (
                <div class="mt-5 p-2 rounded">
                  <div>
                    <a
                      style={{ color: titleColor, fontWeight: "bold" }}
                      href={searchResult.url}
                    >
                      {searchResult.title}
                    </a>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <a
                      style={{
                        color: "grey",
                        fontStyle: "italic",
                        fontSize: "0.8rem",
                      }}
                      href={searchResult.url}
                    >
                      From: {tempDomainUrl}
                    </a>
                    <a
                      href={searchResult.url}
                      style={{ color: headingsContentColor }}
                    >
                      {headingsContent}
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
