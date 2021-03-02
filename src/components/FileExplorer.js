import React, {useContext} from "react"
import {Upload} from "antd"
import {observer} from "mobx-react-lite"
import {InboxOutlined} from "@ant-design/icons"
import styles from "./FileExplorer.module.sass"
import {StoreContext} from "../store";
import samePathBegin from "../utils/samePathBegin";
import * as path from "path"

const FileExplorer = observer(() => {
  const {bookStore} = useContext(StoreContext);
  let folder = null
  const filePaths = []
  // todo corner case if drag and drop folder with files macrotask run immediately
  const onChange = (info) => {
    const {status, originFileObj} = info.file
    if (status === "done") {
      filePaths.push(path.normalize(`file://${info.file.originFileObj.path}`))
      if (!folder) {
        folder = originFileObj.path
        setTimeout(() => {
          bookStore.openBook(folder, filePaths)
        })
      }
      folder = samePathBegin(folder, originFileObj.path)
    }
  }

  return (
    <Upload.Dragger directory showUploadList={false} director customRequest={({onSuccess}) => {
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
