import React from "react";
import { renderHTML } from "../agility/utils";
import parse from "html-react-parser";

const PostDetails = ({ dynamicPageItem, item }) => {

  const replaceGlobally = (original, searchTxt, replaceTxt) => {
    const regex = new RegExp(searchTxt, "g")
    return original.replace(regex, replaceTxt)
  };

  const fields = dynamicPageItem.fields;

  let postsString = replaceGlobally(fields.content, "<h2>", '<h2 className="mt-10">')
  postsString = replaceGlobally(postsString, "<img", '<img className="rounded-md object-cover h-96 w-192 mr-5"')
  
  return (
    <div className="container mx-auto px-4 mt-5">
      {parse(postsString)}
    </div>
  );
};

export default PostDetails;
