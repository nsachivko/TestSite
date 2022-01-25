import React, { Component } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"

const AutocompleteSuggestions = ({
  autoCompleteSuggestions,
  setInput,
  suggestionsDisplay,
  getInput,
}) => {
  let toDisplay
  if (
    typeof getInput !== "undefined" &&
    getInput.length > 0 &&
    autoCompleteSuggestions.length > 0
  ) {
    toDisplay = true
  } else {
    toDisplay = false
  }

  // Displays suggestions
  return (
    toDisplay && (
      <div
        className="p-3 absolute bg-white bg-gray-100 divide-y rounded"
        style={{
          display: { suggestionsDisplay },
          borderColor: "gray",
          borderWidth: "1px",
          maxWidth: "434px",
          minWidth: "434px",
        }}
      >
        {autoCompleteSuggestions.map((value) => {
          return (
            <div class="suggestion-post">
              <a
                onClick={() => setInput(value.title)}
                style={{ color: "#364a59" }}
              >
                {value.title}
              </a>
            </div>
          )
        })}
      </div>
    )
  )
}

export default AutocompleteSuggestions
