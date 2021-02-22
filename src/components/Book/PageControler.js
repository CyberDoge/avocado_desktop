import React, {useContext} from 'react';
import styles from "./PageController.module.sass";
import {Button} from "antd";
import cn from "classnames"
import {FullscreenExitOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import {StoreContext} from "../../store";
import {observer} from "mobx-react-lite";

const PageController = observer(() => {
  const {bookStore} = useContext(StoreContext)

  return (
    <div className={styles.controllerContainer}>

      <div
        className={cn(bookStore.isFullScreen && styles.hidingControlFooter, styles.controlFooter)}> {/*todo rename styles*/}
        <div className={styles.footerControl}>
          <Button onClick={bookStore.currentBook.prevPage} className={styles.pageControlButton} type={"text"}
                  size={"large"}><LeftOutlined/></Button>
          <Button onClick={bookStore.currentBook.nextPage} className={styles.pageControlButton} type={"text"}
                  size={"large"}><RightOutlined/></Button>
        </div>
      </div>
      <Button className={styles.exitFullScreenBtn} onClick={() =>
        document.exitFullscreen()
      }>
        <FullscreenExitOutlined/>
      </Button>
    </div>
  )

});

export default PageController;
