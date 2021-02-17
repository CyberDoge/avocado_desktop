const {dirname} = require("path")
export default function samePathBegin(path, source) {
  if (source.startsWith(path)) {
    return path
  }
  return samePathBegin(dirname(path), source)
}
