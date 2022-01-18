import React from "react"
import { renderHTML } from "../agility/utils"

const TextBlockWithImage = (props) => {
  // get module fields
  const fields = props.fields
  return (
    <div className="container mx-auto px-4 mt-5">
      <div className="flex items-center">
        <img
          className="object-cover h-48 w-96 mr-5 rounded-md"
          src={fields.image.url}
          alt={fields.image.label}
        ></img>
        <div>
          <strong>{fields.title}</strong>
          <span>{fields.content}</span>
        </div>
      </div>
    </div>
  )
}

export default TextBlockWithImage
