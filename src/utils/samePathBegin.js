const {dirname} = require("path")
const slash = require("slash")
export default function samePathBegin(path, source) {
  path = slash(path);
  source = slash(source);
  if (source.startsWith(path)) {
    return path
  }
  return samePathBegin(dirname(path), source)
}
