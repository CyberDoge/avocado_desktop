const { dirname } = require("path")
const slash = require("slash")

export default function samePathBegin(path, source) {
  const slashedPath = slash(path)
  const slashedSource = slash(source)
  if (slashedSource.startsWith(slashedPath)) {
    return slashedPath
  }

  return samePathBegin(dirname(slashedPath), slashedSource)
}
