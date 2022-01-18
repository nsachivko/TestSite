import React from "react"
import { renderHTML } from "../agility/utils"

const Heading = (props) => {
  // get module fields
  const fields = props.fields
  return (
    <div className="container mx-auto">
      <h1 className="z-30">{fields.title}</h1>
    </div>
  )
}

export default Heading
