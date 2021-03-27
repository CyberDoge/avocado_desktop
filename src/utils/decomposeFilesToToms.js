export default function decomposeFilesToToms(rootPath, pagesUrl) {
  let result = []
  let level = { result }
  // todo change to dynamic protocol
  const protocol = "file:/"
  const lengthOfProtocol = protocol.length
  pagesUrl.forEach((path, index) => {
    path
      .substr(lengthOfProtocol + rootPath.length)
      .split("/")
      .reduce((r, title) => {
        if (!r[title]) {
          r[title] = { result: [] }
          r.result.push({
            title,
            children: r[title].result,
            key: title,
            path,
            index,
          })
        }
        return r[title]
      }, level)
  })

  setupLeafObjects(result)
  return result
}

function setupLeafObjects(object) {
  if (object.children?.length === 0) {
    object.isLeaf = true
    object.key = object.path
  }
  if (Array.isArray(object)) {
    object.forEach(setupLeafObjects)
  } else {
    for (let property in object) {
      if (
        object.hasOwnProperty(property) &&
        typeof object[property] === "object"
      ) {
        setupLeafObjects(object[property])
      }
    }
  }
}
