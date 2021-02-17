import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {StoreContext} from "../../store";
import {List} from "antd";
import ImageScene from "./ImageScene";
import styles from "./PageList.module.sass"

const PageList = observer(() => {
  const {bookStore} = useContext(StoreContext)
  return (
    <div className={styles.container}>
      <List
        size={"small"}
        itemLayout="horizontal"
        dataSource={bookStore.currentBook.pagesUrl}
        renderItem={page => (
          // todo make open by tomes
          <List.Item
            extra={<ImageScene className={styles.preview} src={page} onClick={bookStore.currentBook.openPage(page)}/>}
          />
        )}
      />
    </div>
  );
});

export default PageList;
