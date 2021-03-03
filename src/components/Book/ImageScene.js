import React, { useContext } from "react"
import { StoreContext } from "../../store"
import { observer } from "mobx-react-lite"
import PageList from "./PageList"
import { Drawer } from "antd"
import styles from "./ImageScene.module.sass"
import { basename } from "path"
import { useState } from "react"

const initialMouseCoords = {
  startPosition: null,
  minPosition: Number.MAX_SAFE_INTEGER,
  maxPosition: Number.MIN_SAFE_INTEGER,
}
const ImageScene = observer(() => {
  const { bookStore, bookViewerStore } = useContext(StoreContext)
  const onClose = () => {
    bookViewerStore.isDrawerOpen = false
  }
  const [mouseCoordsX, setMouseCoordsX] = useState({ ...initialMouseCoords })

  const handleMouseMove = ({ clientX }) => {
    if (!bookViewerStore.isFullScreen) {
      return
    }
    if (!bookViewerStore.isDrawerOpen && clientX < 30) {
      bookViewerStore.isDrawerOpen = true
    } else if (bookViewerStore.isDrawerOpen && clientX > 300) {
      bookViewerStore.isDrawerOpen = false
    }

    if (mouseCoordsX.startPosition === null) {
      mouseCoordsX.startPosition = clientX

      setTimeout(() => {
        if (
          mouseCoordsX.startPosition - mouseCoordsX.minPosition > 70 &&
          mouseCoordsX.maxPosition - mouseCoordsX.startPosition > 70
        ) {
          bookViewerStore.isForceShowControl = true
          setTimeout(() => {
            bookViewerStore.isForceShowControl = false
          }, 1500)
        }
        setMouseCoordsX({ ...initialMouseCoords })
      }, 700)
    }
    mouseCoordsX.minPosition = Math.min(clientX, mouseCoordsX.minPosition)
    mouseCoordsX.maxPosition = Math.max(clientX, mouseCoordsX.maxPosition)
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
        className={styles.page}
        alt={basename(bookStore.currentBook.currentPage)}
        src={bookStore.currentBook.currentPage}
      />
    </div>
  )
})

export default ImageScene
