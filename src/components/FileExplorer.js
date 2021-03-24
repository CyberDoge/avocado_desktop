import React, { useContext } from "react"
import { Upload } from "antd"
import { observer } from "mobx-react-lite"
import { InboxOutlined } from "@ant-design/icons"
import styles from "./FileExplorer.module.sass"
import { StoreContext } from "../store"
import samePathBegin from "../utils/samePathBegin"
import * as path from "path"
import * as os from "os"

// electron does not support module import of node libs
const { ipcRenderer } = window.require("electron")

const FileExplorer = observer(() => {
  const { bookStore } = useContext(StoreContext)
  let folder = null
  let filePaths = []
  // todo corner case if drag and drop folder with files macrotask run immediately
  const onChange = async (info) => {
    const { status, originFileObj, type } = info.file
    if (status !== "done") {
      return
    }
    if (!folder) {
      folder = originFileObj.path
      setTimeout(() => {
        bookStore.openBook(folder, filePaths)
      }, 10000)
    }
    if (type === "application/zip") {
      const zipSource = originFileObj.path
      const unzipDest = `${os.tmpdir()}${path.sep}avocado-desktop`
      const files = await ipcRenderer.invoke("unzip", zipSource, unzipDest)
      if (!files) {
        return
      }
      filePaths = filePaths.concat(
        files.map(file =>
          path.normalize(`file://${unzipDest}${path.sep}${file}`)
        )
      )
      folder = unzipDest
    } else {
      filePaths.push(path.normalize(`file://${originFileObj.path}`))
      folder = samePathBegin(folder, originFileObj.path)
    }
  }

  return (
    <Upload.Dragger
      showUploadList={false}
      customRequest={({ onSuccess }) => {
        onSuccess()
      }}
      directory
      multiple
      onChange={onChange}
    >
      <p>
        <InboxOutlined className={styles.icon} />
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
