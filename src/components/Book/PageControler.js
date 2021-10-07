import React, { useContext } from "react"
import { Button } from "antd"
import cn from "classnames"
import {
  ArrowsAltOutlined,
  FullscreenExitOutlined,
  LeftOutlined,
  RightOutlined,
  ShrinkOutlined
} from "@ant-design/icons"
import { StoreContext } from "store"
import { observer } from "mobx-react-lite"
import styles from "./PageController.module.sass"

const PageController = observer(() => {
  const { bookStore, bookViewerStore } = useContext(StoreContext)

  return (
    <div
      className={cn(
        styles.controllerContainer,
        bookViewerStore.isForceShowControl && styles.showAll
      )}
    >
      <div
        className={cn(
          bookViewerStore.isFullScreen && styles.hidingControlFooter,
          styles.controlFooter
        )}
      >
        <div
          className={styles.pageControlContainer}
          onDoubleClick={(event) => event.stopPropagation()}
        >
          <Button
            onClick={bookStore.currentBook.prevPage}
            className={styles.pageControlButton}
            type="text"
            size="large"
          >
            <LeftOutlined />
          </Button>
          <Button
            onClick={bookStore.currentBook.nextPage}
            className={styles.pageControlButton}
            type="text"
            size="large"
          >
            <RightOutlined />
          </Button>
        </div>
      </div>
      <div className={styles.exitFullScreenContainer}>
        <Button
          className={styles.exitFullScreenBtn}
          onClick={() => document.exitFullscreen()}
        >
          <FullscreenExitOutlined />
        </Button>
        <Button
          className={styles.exitFullScreenBtn}
          onClick={() => {
            bookViewerStore.isFullWidth = !bookViewerStore.isFullWidth
          }}
        >
          {bookViewerStore.isFullWidth ? (
            <ShrinkOutlined />
          ) : (
            <ArrowsAltOutlined />
          )}
        </Button>
      </div>
    </div>
  )
})

export default PageController
