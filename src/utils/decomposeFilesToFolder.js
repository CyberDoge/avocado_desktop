export default function decomposeFilesToFolder(rootPath, pagesUrl) {
  let result = []
  let level = { result }

  pagesUrl.forEach((path) => {
    path
      .substr(5 + rootPath.length)
      .split("/")
      .filter(Boolean)
      .reduce((r, title) => {
        if (!r[title]) {
          r[title] = { result: [] }
          r.result.push({ title, children: r[title].result, key: title, path })
        }
        return r[title]
      }, level)
  })

  deleteEmptyChildren(result)
  return result
}

function deleteEmptyChildren(object) {
  if (object.children?.length === 0) {
    delete object.children
    object.isLeaf = true
    object.key = object.path
  }
  if (Array.isArray(object)) {
    object.forEach(deleteEmptyChildren)
  } else {
    for (let property in object) {
      if (
        object.hasOwnProperty(property) &&
        typeof object[property] === "object"
      ) {
        deleteEmptyChildren(object[property])
      }
    }
  }
}
