import React, {
  useContext, useEffect, useRef, useState
} from "react"
import { observer } from "mobx-react-lite"
import { StoreContext } from "store"
import { Tree } from "antd"
import { DownOutlined } from "@ant-design/icons"
import styles from "./PageList.module.sass"

const PageList = observer(() => {
  const {
    bookStore: { currentBook },
    bookViewerStore
  } = useContext(StoreContext)

  const [expandedOuterKeys, setExpandedOuterKeys] = useState([])
  const itemRefMap = useRef(new Map())

  useEffect(() => {
    if (bookViewerStore.isFullScreen && bookViewerStore.isDrawerOpen) {
      itemRefMap.current.get(currentBook.currentPageIndex).scrollIntoView()
    }
  }, [
    bookViewerStore.isFullScreen,
    currentBook.currentPageIndex,
    bookViewerStore.isDrawerOpen
  ])

  return (
    <div className={styles.container}>
      <Tree.DirectoryTree
        switcherIcon={<DownOutlined />}
        showIcon={false}
        defaultExpandedKeys={[currentBook.toms[0]?.key]}
        expandedKeys={[
          ...expandedOuterKeys,
          currentBook.currentChapter?.key
        ].filter(Boolean)}
        treeData={currentBook.toms}
        selectedKeys={[currentBook.currentPage]}
        onExpand={(expandedKeys, { expanded, node }) => {
          setExpandedOuterKeys(
            expandedKeys.filter((key) => node.key.startsWith(key))
          )
          currentBook.currentChapter = expanded ? node : null
        }}
        onSelect={(_, info) => {
          if (info.node.isLeaf) {
            currentBook.openPage(info.node.path)
          }
        }}
        titleRender={(data) => (data.isLeaf ? (
          <img
            ref={(ref) => {
              if (!itemRefMap.current.has(data.index)) {
                itemRefMap.current.set(data.index, ref)
              }
            }}
            alt={data.title}
            className={styles.preview}
            src={data.path}
          />
        ) : (
          data.title
        ))}
      />
    </div>
  )
})

export default PageList
