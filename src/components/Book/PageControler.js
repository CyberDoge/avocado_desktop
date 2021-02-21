import React from 'react';
import styles from "./PageController.module.sass";
import {Button} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

const PageController = () => {
  return (
    <div className={styles.controlFooter}>
      <div className={styles.pageControlContainer}>
        <Button className={styles.pageControlButton} type={"text"} size={"large"}><LeftOutlined/></Button>
        <Button className={styles.pageControlButton} type={"text"} size={"large"}><RightOutlined/></Button>
      </div>
    </div>
  );
};

export default PageController;
