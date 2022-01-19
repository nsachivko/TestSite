// import React, { useEffect, useState } from "react"

// const DisplayResults = ({ searchResults, getInput }) => {
//   let isEmpty
//   let tempDomainUrl
//   let headingsContent
//   const titleColor = "#364A59"
//   const searchResultsColor = "#24272A"
//   const headingsContentColor = "#24272A"

//   if (typeof getInput !== "undefined") {
//     if (searchResults.length > 0 && getInput.length > 0) {
//       isEmpty = true
//     } else {
//       isEmpty = false
//     }
//   } else {
//     isEmpty = false
//   }

//   const extractDomain = (url) => {
//     var result
//     var match
//     if (
//       (match = url.match(
//         /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
//       ))
//     ) {
//       result = match[1]
//       if ((match = result.match(/^[^\.]+\.(.+\..+)$/))) {
//         result = match[1]
//       }
//     }
//     return result
//   }

//   return (
//     <div className="mt-5">
//       <h1
//         className="text-2xl font-semibold"
//         style={{ color: searchResultsColor, fontWeight: "bold"}}
//       >
//         Search Results:{" "}
//       </h1>
//       {isEmpty &&
//         searchResults.map((searchResult) => {
//           {
//             tempDomainUrl = extractDomain(searchResult.url)
//             headingsContent = searchResult.headings[0] + " | "+ searchResult.headings[1]
//             console.log(headingsContent)
//             if (headingsContent.length > 50) {
//               headingsContent = headingsContent.substr(0, 50)
//               headingsContent += "..."
//             }
//             if (searchResult.title.trim() !== "404") {
//               return (
//                 <div class="mt-5 p-2 rounded">
//                   <div>
//                     <a
//                       style={{ color: titleColor, fontWeight: "bold" ,  textDecoration: "underline"}}
//                       href={searchResult.url}
//                     >
//                       {searchResult.title}
//                     </a>
//                   </div>
//                   <div style={{ display: "flex", flexDirection: "column" }}>
//                     <a
//                       style={{
//                         color: "grey",
//                         fontStyle: "italic",
//                         fontSize: "0.8rem",
//                       }}
//                       href={searchResult.url}
//                     >
//                       From: {tempDomainUrl}
//                     </a>
//                     <a
//                       href={searchResult.url}
//                       style={{ color: headingsContentColor }}
//                     >
//                       {headingsContent}
//                     </a>
//                   </div>
//                 </div>
//               )
//             }
//           }
//         })}
//       {!isEmpty && (
//         <div class="mt-5 p-2 rounded">
//           <strong>No results found</strong>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DisplayResults

import React, { useEffect, useState } from "react"
let isEmpty
let tempDomainUrl
let headingsContent
const titleColor = "#364A59"
const searchResultsColor = "#24272A"
const headingsContentColor = "#24272A"

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

const renderData = (data) => {
  console.log(data)
  return (
    <ul>
      {data.map((el, index) => {
        {
          tempDomainUrl = extractDomain(el.url)
          headingsContent = el.headings[0] + " | " + el.headings[1]
          console.log(headingsContent)
          if (headingsContent.length > 50) {
            headingsContent = headingsContent.substr(0, 50)
            headingsContent += "..."
          }
        }
        return (
          <li key={index}>
            <div class="mt-5 p-2 rounded">
              <div>
                <a
                  style={{
                    color: titleColor,
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                  href={el.url}
                >
                  {el.title}
                </a>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <a
                  style={{
                    color: "grey",
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                  }}
                  href={el.url}
                >
                  From: {tempDomainUrl}
                </a>
                <a href={el.url} style={{ color: headingsContentColor }}>
                  {headingsContent}
                </a>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function PaginationComponent({ searchResults, getInput }) {
  console.log(searchResults)
  const [data, setData] = useState([])

  const [currentPage, setcurrentPage] = useState(1)
  const [itemsPerPage, setitemsPerPage] = useState(5)

  const [pageNumberLimit, setpageNumberLimit] = useState(5)
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0)

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id))
  }

  const pages = []
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      )
    } else {
      return null
    }
  })

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(searchResults))
  }, [searchResults])

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1)

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1)

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  let pageIncrementBtn = null
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>
  }

  let pageDecrementBtn = null
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5)
  }

  return (
    <>
      <h1
        className="text-2xl font-semibold mt-5"
        style={{ color: searchResultsColor, fontWeight: "bold"}}
      >
        Search Results:{" "}
      </h1> 
      {renderData(currentItems)}
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
      <button onClick={handleLoadMore} className="loadmore">
        Load More
      </button>
    </>
  )
}

export default PaginationComponent
