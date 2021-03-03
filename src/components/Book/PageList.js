import React, { useContext, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { StoreContext } from "../../store"
import { List } from "antd"
import classnames from "classnames"
import styles from "./PageList.module.sass"

const PageList = observer(({ className }) => {
  const {
    bookStore: { currentBook },
    bookViewerStore,
  } = useContext(StoreContext)
  const itemsRef = useRef([])
  useEffect(() => {
    if (bookViewerStore.isFullScreen && bookViewerStore.isDrawerOpen) {
      itemsRef.current[currentBook.currentPageIndex].scrollIntoView()
    }
  }, [
    bookViewerStore.isFullScreen,
    currentBook.currentPageIndex,
    bookViewerStore.isDrawerOpen,
  ])
  return (
    <div className={classnames(styles.container, className)}>
      <List
        size={"small"}
        itemLayout="horizontal"
        dataSource={currentBook.pagesUrl}
        renderItem={(page) => (
          // todo make open by tomes
          <List.Item
            className={currentBook.currentPage === page && styles.selectedPage}
            onClick={() => {
              currentBook.openPage(page)
            }}
            extra={
              <img
                ref={(ref) => itemsRef.current.push(ref)}
                alt={page}
                className={styles.preview}
                src={page}
              />
            }
          />
        )}
      />
    </div>
  )
})

export default PageList
