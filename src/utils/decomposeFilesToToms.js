function sortChildren(toms) {
  if (toms.children.length > 1) {
    toms.children.sort(
      (first, second) => second.children.length - first.children.length
    )
    toms.children.forEach(sortChildren)
  }
}

function setupRoot(toms) {
  if (toms.children.length > 1) {
    sortChildren(toms)

    return toms.children
  }

  return setupRoot(toms.children[0])
}

export default function decomposeFilesToToms(pagesUrl) {
  // todo change to dynamic protocol
  const protocol = "file:/"
  const lengthOfProtocol = protocol.length
  const accum = { children: [] }
  pagesUrl.forEach((pageUrl) => {
    let nextNode = accum
    // todo Check for windows folders
    const pageUrlNodes = pageUrl.substr(lengthOfProtocol).split("/")
    pageUrlNodes.forEach((pageUrlNode) => {
      const currentNode = nextNode.children.find(
        (child) => child.title === pageUrlNode
      )
      if (!currentNode) {
        const newNode = {
          key: nextNode.key ? `${nextNode.key}/${pageUrlNode}` : pageUrlNode,
          index: nextNode.children.length,
          title: pageUrlNode,
          isLeaf: true,
          path: pageUrl,
          children: []
        }
        nextNode.isLeaf = false
        nextNode.children.push(newNode)
        nextNode = newNode

        return
      }
      nextNode = currentNode
      nextNode.isLeaf = false
    })

    return accum
  })

  return setupRoot(accum)
}
