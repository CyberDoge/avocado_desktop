export default function decomposeFilesToToms(pagesUrl) {
  // todo change to dynamic protocol
  // const protocol = "file:/"
  // const lengthOfProtocol = protocol.length
  const accum = { children: [] }
  pagesUrl.forEach((pageUrl) => {
    let nextNode = accum
    // todo Check for windows folders
    const pageUrlNodes = pageUrl.split("/")
    pageUrlNodes.forEach((pageUrlNode) => {
      const currentNode = nextNode.children.find(
        (child) => child.title === pageUrlNode
      )
      if (!currentNode) {
        const newNode = {
          key: pageUrl,
          title: pageUrlNode,
          children: [],
          isLeaf: true
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

  return accum.children
}
