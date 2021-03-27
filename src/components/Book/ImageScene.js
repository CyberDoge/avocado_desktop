import React, { useContext } from "react"
import { StoreContext } from "../../store"
import { observer } from "mobx-react-lite"
import PageList from "./PageList"
import { Drawer } from "antd"
import styles from "./ImageScene.module.sass"
import { basename } from "path"
import cn from "classnames"
import useMouseDrag from "../../hooks/useMouseDrag"

const ImageScene = observer(() => {
  const { bookStore, bookViewerStore } = useContext(StoreContext)
  const onClose = () => {
    bookViewerStore.isDrawerOpen = false
  }
  const setClientX = useMouseDrag(()=>{
    bookViewerStore.isForceShowControl = true
    return () => bookViewerStore.isForceShowControl = false
  })

  const handleMouseMove = ({ clientX }) => {
    if (!bookViewerStore.isFullScreen) {
      return
    }
    if (!bookViewerStore.isDrawerOpen && clientX < 30) {
      bookViewerStore.isDrawerOpen = true
    } else if (bookViewerStore.isDrawerOpen && clientX > 300) {
      bookViewerStore.isDrawerOpen = false
    }
    setClientX(clientX)
  }
  return (
    <div className={styles.container} onMouseMove={handleMouseMove}>
      {bookViewerStore.isFullScreen && (
        <Drawer
          mask={false}
          onMouseMove={handleMouseMove}
          placement="left"
          closable={false}
          onClose={onClose}
          visible={bookViewerStore.isDrawerOpen}
          getContainer={false}
        >
          <PageList />
        </Drawer>
      )}
      <img
        onClick={() => {
          bookViewerStore.isFullScreen && bookStore.currentBook.nextPage()
        }}
        draggable={false}
        className={cn(
          bookViewerStore.isFullWidth
            ? styles.fullWidthPage
            : styles.fullHeightPage
        )}
        alt={basename(bookStore.currentBook.currentPage)}
        src={bookStore.currentBook.currentPage}
      />
    </div>
  )
})

export default ImageScene
