import React, { useContext, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { StoreContext } from "../../store"
import { Tree } from "antd"
import classnames from "classnames"
import styles from "./PageList.module.sass"
import { DownOutlined } from "@ant-design/icons"

const PageList = observer(({ className }) => {
  const {
    bookStore: { currentBook },
    bookViewerStore,
  } = useContext(StoreContext)
  const itemsRef = useRef([])
  useEffect(() => {
    // todo wrong image
    console.log(itemsRef.current[currentBook.currentPageIndex])
    if (bookViewerStore.isFullScreen && bookViewerStore.isDrawerOpen) {
      itemsRef.current[currentBook.currentPageIndex]?.scrollIntoView()
    }
  }, [
    bookViewerStore.isFullScreen,
    currentBook.currentPageIndex,
    bookViewerStore.isDrawerOpen,
  ])
  return (
    <div className={classnames(styles.container, className)}>
      <Tree.DirectoryTree
        switcherIcon={<DownOutlined />}
        showIcon={false}
        defaultExpandedKeys={[currentBook.toms[0].key]}
        expandedKeys={[currentBook.currentChapter?.key]}
        treeData={currentBook.toms}
        onExpand={(_, { expanded, node }) => {
          currentBook.currentChapter = expanded ? node : []
        }}
        onSelect={(_, info) => {
          if (info.node.isLeaf) {
            currentBook.openPage(info.node.path)
          }
        }}
        titleRender={(data) =>
          data.isLeaf ? (
            <img
              ref={(ref) => itemsRef.current.push(ref)}
              alt={data.title}
              className={styles.preview}
              src={data.path}
            />
          ) : (
            data.title
          )
        }
      />
    </div>
  )
})

export default PageList
