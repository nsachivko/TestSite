import React, { useState, useEffect } from "react"

const FeaturedPost = ({ ...props }) => {
  props.page.seo.metaKeywords =
    props.page.seo.metaKeywords + props.fields.featuredPost.seo.metaKeywords
  props.page.seo.metaDescription =
    props.page.seo.metaDescription +
    props.fields.featuredPost.seo.metaDescription
  props.page.title = props.fields.featuredPost.fields.title
  return (
    <div className="container mx-auto">
      <h1 className="z-30">FeaturedPost</h1>
    </div>
  )
}

export default FeaturedPost
