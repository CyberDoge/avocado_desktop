import React, {useContext} from "react"
import {Upload} from "antd"
import {observer} from "mobx-react-lite"
import {InboxOutlined} from "@ant-design/icons"
import styles from "./FileExplorer.module.sass"
import {StoreContext} from "../context/storeContext";

const FileExplorer = observer(() => {
  const {imgDataStore} = useContext(StoreContext);
  const onChange = (info) => {
    const {status} = info.file
    if (status === "done") {
      imgDataStore.addImage({src: `atom:/${info.file.originFileObj.path}`})
    }
  }
  return (
    <Upload.Dragger directory customRequest={({onSuccess}) => {
      onSuccess()
    }} multiple onChange={onChange}>
      <p>
        <InboxOutlined className={styles.icon}/>
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Upload.Dragger>
  )
})

export default FileExplorer
