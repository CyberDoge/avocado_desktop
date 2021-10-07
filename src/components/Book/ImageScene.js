import React, { useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import { Drawer } from "antd"
import { basename } from "path"
import cn from "classnames"
import { StoreContext } from "store"
import styles from "./ImageScene.module.sass"
import PageList from "./PageList"

const ImageScene = observer(() => {
  const { bookStore, bookViewerStore } = useContext(StoreContext)
  const [showControlTimeout, setShowControlTimeout] = useState()
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
    } else {
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
          !bookViewerStore.isForceShowControl
            && bookViewerStore.isFullScreen
            && styles.hideCursor
        )}
        onMouseMove={handleMouseMove}
        onClick={changePage}
        role="presentation"
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
