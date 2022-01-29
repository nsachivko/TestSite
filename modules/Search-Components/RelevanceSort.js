// Sort array by title
const sortByTitle = (results, userInput) => {
  const doSwap = -1
  const doNotSwap = 1
  const input =
    typeof userInput != "undefined" ? userInput.split(" ")[0] : userInput
  results = results.sort((el2, el1) => {
    if (el1.title.trim().toLowerCase().includes(input.toLowerCase())) {
      if (el2.title.trim().toLowerCase().includes(input.toLowerCase())) {
        const el1Index = el1.title
          .trim()
          .toLowerCase()
          .indexOf(input.toLowerCase())
        const el2Index = el2.title
          .trim()
          .toLowerCase()
          .indexOf(input.toLowerCase())
        if (el2Index < el1Index) {
          return doSwap
        } else {
          return doNotSwap
        }
      }
    } else {
      return doSwap
    }
  })
  return results
}

module.exports = { sortByTitle }
