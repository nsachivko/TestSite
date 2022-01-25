const formatTextCompleter = (autoCompleteSuggestions, getInput) => {
  if (
    typeof autoCompleteSuggestions[0] !== "undefined" &&
    getInput.length < 26 &&
    getInput.length > 0
  ) {
    let test = autoCompleteSuggestions.map((result) => {
      return result.title
        .toLowerCase()
        .replaceAll("-", " ")
        .replaceAll(".", " ")
        .split(" ")
    })
    const iterations = test.length
    for (let i = iterations - 1; 1 < i; i--) {
      test[i] = test[i].filter((e) => {
        return typeof e !== "undefined" && e !== "" ? e : null
      })
      test[0].push(...test[i])
    }
    const newTest = test[0]
    let result
    const input = getInput.split(" ")
    newTest.forEach((word) => {
      if (
        word.substring(0, input[input.length - 1].length) ===
        input[input.length - 1]
      ) {
        if (input.length > 1) {
          result = ""
          for (let i = 0; i < input.length - 1; i++) {
            result += input[i] + " "
          }
          result += word
        } else {
          result = word
        }
      }
    })
    if (typeof result !== "undefined") {
      if (result.length < 26) {
        return result
      }
    }
  }
}

module.exports = { formatTextCompleter }
