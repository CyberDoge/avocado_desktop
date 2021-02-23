import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {StoreContext} from "../../store";
import PageList from "./PageList";
import {Button, Layout} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import styles from "./BookViewer.module.sass"
import {Content, Header} from "antd/es/layout/layout";
import ImageScene from "./ImageScene";
import {basename} from "path"
import PageController from "./PageControler";

const BookViewer = observer(() => {
  const {bookStore} = useContext(StoreContext)
  useEffect(() => {
    const onfullscreenchange = () => {
      bookStore.isFullScreen = !bookStore.isFullScreen
    }
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        if (bookStore.currentBook.isLastPage && bookStore.isFullScreen) {
        }
        bookStore.currentBook.nextPage()
      } else if (event.key === "ArrowLeft") {
        bookStore.currentBook.prevPage()
      } else if (event.key === " " && bookStore.isFullScreen) {
        event.preventDefault()
        if (bookStore.currentBook.isLastPage && bookStore.isFullScreen) {
          document.exitFullscreen()
        }
        bookStore.currentBook.nextPage()
      }
    }
    document.onfullscreenchange = onfullscreenchange
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("fullscreenchange", onfullscreenchange)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [bookStore.isFullScreen, bookStore.currentBook, bookStore])

  return (
    <Layout className={styles.container}>
      <Sider className={styles.leftAside}>
        <Header>
          <Button shape="circle" onClick={bookStore.dropCurrentBook}>
            <CloseOutlined/>
          </Button>
        </Header>
        <PageList/>
      </Sider>
      <Content onDoubleClick={(event) => !bookStore.isFullScreen && event.currentTarget.requestFullscreen()}>
        <ImageScene className={styles.page}
                    src={bookStore.currentBook.currentPage}
                    alt={basename(bookStore.currentBook.currentPage)}/>
        <PageController/>
      </Content>
    </Layout>
  );
});

export default BookViewer;
