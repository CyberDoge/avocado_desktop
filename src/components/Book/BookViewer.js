import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {StoreContext} from "../../store";
import PageList from "./PageList";
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import styles from "./BookViewer.module.sass"
import {Content} from "antd/es/layout/layout";
import ImageScene from "./ImageScene";
import {basename} from "path"
import PageController from "./PageControler";

const BookViewer = observer(() => {
  const {bookStore} = useContext(StoreContext)
  return (
    <Layout className={styles.container}>
      <Sider className={styles.pageList}>
        <PageList width={250}/>
      </Sider>
      <Content>
        <ImageScene className={styles.page} src={bookStore.currentBook.currentPage}
                    alt={basename(bookStore.currentBook.currentPage)}/>
        <PageController/>
      </Content>
    </Layout>
  );
});

export default BookViewer;
