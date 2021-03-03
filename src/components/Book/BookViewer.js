import React, { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { StoreContext } from "../../store"
import PageList from "./PageList"
import { Button, Layout } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import Sider from "antd/es/layout/Sider"
import styles from "./BookViewer.module.sass"
import { Content, Header } from "antd/es/layout/layout"
import ImageScene from "./ImageScene"
import PageController from "./PageControler"

const BookViewer = observer(() => {
  const { bookStore, bookViewerStore } = useContext(StoreContext)
  useEffect(() => {
    const onfullscreenchange = () => {
      bookViewerStore.isFullScreen = !bookViewerStore.isFullScreen
    }
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        if (bookStore.currentBook.isLastPage && bookViewerStore.isFullScreen) {
        }
        bookStore.currentBook.nextPage()
      } else if (event.key === "ArrowLeft") {
        bookStore.currentBook.prevPage()
      } else if (event.key === " " && bookViewerStore.isFullScreen) {
        event.preventDefault()
        if (bookStore.currentBook.isLastPage && bookViewerStore.isFullScreen) {
          document.exitFullscreen()
        }
        bookStore.currentBook.nextPage()
      }
    }
    document.onfullscreenchange = onfullscreenchange
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("fullscreenchange", onfullscreenchange)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [
    bookViewerStore.isFullScreen,
    bookStore.currentBook,
    bookStore,
    bookViewerStore,
  ])
  useEffect(() => {
    // todo change to ref
    document.querySelector("main").scrollTop = 0
  }, [bookStore.currentBook.currentPageIndex])
  return (
    <Layout className={styles.container}>
      <Sider className={styles.leftAside}>
        <Header>
          <Button shape="circle" onClick={bookStore.dropCurrentBook}>
            <CloseOutlined />
          </Button>
        </Header>
        <PageList />
      </Sider>
      <Content
        onDoubleClick={(event) =>
          !bookViewerStore.isFullScreen &&
          event.currentTarget.requestFullscreen()
        }
      >
        <ImageScene />
        <PageController />
      </Content>
    </Layout>
  )
})

export default BookViewer
