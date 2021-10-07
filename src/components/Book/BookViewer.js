import React, { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Button, Layout } from "antd"
import { CloseOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons"
import Sider from "antd/es/layout/Sider"
import { Content, Header } from "antd/es/layout/layout"
import { StoreContext } from "store"
import useHotKeys from "hooks/useHotKeys"
import styles from "./BookViewer.module.sass"
import PageList from "./PageList"
import ImageScene from "./ImageScene"
import PageController from "./PageControler"

const BookViewer = observer(() => {
  const { bookStore, bookViewerStore } = useContext(StoreContext)
  useHotKeys()
  useEffect(() => {
    document.querySelector("#imageContent").scrollTop = 0
  }, [bookStore.currentBook.currentPageIndex])

  return (
    <Layout className={styles.container}>
      <Sider className={styles.leftAside}>
        <Header>
          <Button shape="circle" onClick={bookStore.dropCurrentBook}>
            <CloseOutlined />
          </Button>
          <Button
            shape="circle"
            onClick={bookStore.currentBook.dropCurrentChapter}
          >
            <VerticalAlignMiddleOutlined />
          </Button>
        </Header>
        {!bookViewerStore.isFullScreen && <PageList />}
      </Sider>
      <Content
        id="imageContent"
        onDoubleClick={(event) => !bookViewerStore.isFullScreen
          && event.currentTarget.requestFullscreen()}
      >
        <ImageScene />
        <PageController />
      </Content>
    </Layout>
  )
})

export default BookViewer
