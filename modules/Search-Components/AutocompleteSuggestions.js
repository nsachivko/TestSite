import React, { Component } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"

const AutocompleteSuggestions = ({
  autoCompleteSuggestions,
  setInput,
  suggestionsDisplay,
}) => {
  // Displays suggestions
  return (
    <div
      className="absolute py-2 bg-white bg-gray-100 divide-y divide-gray-300 rounded-md shadow-xl min-w-5"
      style={{ display: { suggestionsDisplay } }}
    >
      {autoCompleteSuggestions.map((value) => {
        return (
          <a
            onClick={() => setInput(value.title)}
            className="block px-4 py-2 text-sm hover:bg-gray-400 hover:text-white"
            style={{ color: "#364A59" }}
          >
            {value.title}
          </a>
        )
      })}
    </div>
  )
}

export default AutocompleteSuggestions
