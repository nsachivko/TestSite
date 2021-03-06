import React, { useEffect, useState } from "react"
let tempDomainUrl
let headingsContent
const titleColor = "#364A59"
const searchResultsColor = "#24272A"
const headingsContentColor = "#24272A"

// Function that extracts domain from site
const extractDomain = (url) => {
  let result
  let match
  if (
    (match = url.match(
      /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
    ))
  ) {
    result = match[1]
  }
  return result
}

// Renders posts with sites data
// - The code is a function that takes in data as an argument and returns the rendered output.
// - The code iterates through the data array and renders each item in the list.
const renderData = (data) => {
  const noData = data.length === 0 ? true : false
  return (
    <ul>
      {noData && <h1 className="mt-5">No Data</h1>}
      {data.map((el, index) => {
        {
          tempDomainUrl = extractDomain(el.url)
          headingsContent = el.headings[0] + " | " + el.headings[1]
          if (headingsContent.length > 50) {
            headingsContent = headingsContent.substr(0, 50)
            headingsContent += "..."
          }
        }
        return (
          <li key={index}>
            <div className="mt-5 p-2 rounded">
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

// Renders page controllers, buttons, page numbers
const PaginationComponent = ({ searchResults, pageNumber }) => {
  const [data, setData] = useState([])

  const [currentPage, setcurrentPage] = useState(1)
  const [itemsPerPage, setitemsPerPage] = useState(5)

  const [pageNumberLimit, setpageNumberLimit] = useState(5)
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0)

  const noData = searchResults.length === 0 ? true : false

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

  // Renders page numbers
  // - The code is rendering the page numbers.
  // - The code starts by checking if the number is less than maxPageNumberLimit and greater than minPageNumberLimit,
  // - in which case it renders a <li> with an id of that number and onClick handler.
  // - If the current page is equal to that number, then it renders a <li> with className="active".
  // - Otherwise, it returns null.
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

  // - Trigger, send user to first page after data reload
  // - The code will cause the user to be sent back to the first page after data reload.
  useEffect(() => {
    if (pageNumber === 1) {
      pageNumber = 2
      const currentNumberOfPages = currentPage
      for (let i = 0; i < currentNumberOfPages; i++) {
        handlePrevbtn()
      }
    }
    setData(searchResults)
  }, [searchResults])

  // - Goes to next page
  const handleNextbtn = () => {
    if (currentPage < pages.length) {
      setcurrentPage(currentPage + 1)

      if (currentPage + 1 > maxPageNumberLimit) {
        setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
      }
    }
  }

  // Goes to previous page
  const handlePrevbtn = () => {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1)

      if ((currentPage - 1) % pageNumberLimit == 0) {
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
      }
    }
  }

  // - Next, there are two links on the page.
  // - One link is to go back one page (Prev) and another link is to go forward one page (Next).
  // - The code renders button numbers, and search results.
  return (
    <>
      <h1
        className="text-2xl font-semibold mt-5"
        style={{ color: searchResultsColor, fontWeight: "bold" }}
      >
        Search Results:
      </h1>
      {renderData(currentItems)}

      {!noData && (
        <ul className="pageNumbers">
          <li>
            {currentPage !== 1 && (
              <a
                className="text-gray-500"
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
              >
                Prev
              </a>
            )}
          </li>
          {renderPageNumbers}
          <li>
            {currentPage !== pages.length && (
              <a
                className="text-gray-500"
                onClick={handleNextbtn}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
              >
                Next
              </a>
            )}
          </li>
        </ul>
      )}
    </>
  )
}

export default PaginationComponent
