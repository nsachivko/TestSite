import React from "react";
import { renderHTML } from "../agility/utils";
import parse from "html-react-parser";

const PostDetails = ({ dynamicPageItem, item }) => {

  const replaceGlobally = (original, searchTxt, replaceTxt) => {
    const regex = new RegExp(searchTxt, "g")
    return original.replace(regex, replaceTxt)
  };

  const fields = dynamicPageItem.fields;
  console.log(fields)
  let postsString = replaceGlobally(fields.content, "<h2>", '<h2 className="mt-15">')
  postsString = replaceGlobally(postsString, "<img", '<img className="rounded-md object-cover h-96 w-192 mr-5"')
  postsString = replaceGlobally(postsString, '<p', '<p className="mt-5"')
  postsString = replaceGlobally(postsString, '<p class=""', '<p className="mt-5"')

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="max-w-5xl">
        {parse(postsString)}
      </div>
    </div>
  );
};

export default PostDetails;
