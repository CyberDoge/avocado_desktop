import React, {useContext} from 'react';
import {StoreContext} from "../../store";
import {observer} from "mobx-react-lite";
import PageList from "./PageList";
import {Drawer} from "antd";
import styles from "./ImageScene.module.sass"
import {basename} from "path";

const ImageScene = observer(() => {
  const {bookStore, bookViewerStore} = useContext(StoreContext)
  const onClose = () => {
    bookViewerStore.isDrawerOpen = false;
  };
  const handleMouseMove = (event) => {
    if (!bookViewerStore.isFullScreen) {
      return
    }
    if (!bookViewerStore.isDrawerOpen && event.clientX < 30) {
      bookViewerStore.isDrawerOpen = true
    } else if (bookViewerStore.isDrawerOpen && event.clientX > 300) {
      bookViewerStore.isDrawerOpen = false
    }
  }
  return (<div className={styles.container} onMouseMove={handleMouseMove}>
    {bookViewerStore.isFullScreen &&
    <Drawer
      mask={false}
      onMouseMove={handleMouseMove}
      placement="left"
      closable={false}
      onClose={onClose}
      visible={bookViewerStore.isDrawerOpen}
      getContainer={false}
    >
      <PageList/>
    </Drawer>
    }
    <img onClick={() => {
      bookViewerStore.isFullScreen && bookStore.currentBook.nextPage()
    }} draggable={false}
         className={styles.page}
         alt={basename(bookStore.currentBook.currentPage)}
         src={bookStore.currentBook.currentPage}
    />
  </div>)
});

export default ImageScene;
