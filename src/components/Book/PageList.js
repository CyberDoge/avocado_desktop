import React, {useContext, useMemo} from 'react';
import {observer} from "mobx-react-lite";
import {StoreContext} from "../../store";
import {List} from "antd";
import ImageScene from "./ImageScene";
import styles from "./PageList.module.sass"

const PageList = observer(() => {
  const {bookStore: {currentBook}} = useContext(StoreContext)
  return useMemo(() => (
    <div className={styles.container}>
      <List
        size={"small"}
        itemLayout="horizontal"
        dataSource={currentBook.pagesUrl}
        renderItem={page => (
          // todo make open by tomes
          <List.Item
            className={currentBook.currentPage === page && styles.selectedPage}
            onClick={() => {
              currentBook.openPage(page)
            }}
            extra={<ImageScene className={styles.preview} src={page}/>}
          />
        )}
      />
    </div>
  ), [currentBook.currentPageIndex]);
});

export default PageList;
