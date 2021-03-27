import React, { useContext, useState } from "react"
import { StoreContext } from "../../store"
import { observer } from "mobx-react-lite"
import PageList from "./PageList"
import { Drawer } from "antd"
import styles from "./ImageScene.module.sass"
import { basename } from "path"
import cn from "classnames"

const ImageScene = observer(() => {
  const { bookStore, bookViewerStore } = useContext(StoreContext)
  const [showControlTimeout, setShowControlTimeout] = useState(0)
  const onClose = () => {
    bookViewerStore.isDrawerOpen = false
  }
  const handleMouseMove = ({ clientX }) => {
    if (!bookViewerStore.isFullScreen) {
      return
    }
    if (!bookViewerStore.isDrawerOpen && clientX < 30) {
      bookViewerStore.isDrawerOpen = true
    } else if (bookViewerStore.isDrawerOpen && clientX > 300) {
      bookViewerStore.isDrawerOpen = false
    }
    const newShowControlTimeout = setTimeout(() => {
      bookViewerStore.isForceShowControl = false
    }, 1500)
    clearTimeout(showControlTimeout)
    setShowControlTimeout(newShowControlTimeout)
    bookViewerStore.isForceShowControl = true
  }
  const changePage = ({ clientX }) => {
    if (!bookViewerStore.isFullScreen) {
      return
    }
    if (window.innerWidth / 2 > clientX) {
      bookStore.currentBook.nextPage()
    }else {
      bookStore.currentBook.prevPage()
    }
  }
  return (
    <>
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
      <div
        className={cn(
          styles.container,
          !bookViewerStore.isForceShowControl && styles.hideCursor
        )}
        onMouseMove={handleMouseMove}
        onClick={changePage}
      >
        <img
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
    </>
  )
})

export default ImageScene
