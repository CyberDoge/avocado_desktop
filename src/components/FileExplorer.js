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
  const archivesPath = []
  const pagesPath = []
  const decompressAllArchivesAndAddImages = () => {
    setTimeout(async () => {
      const unzipDest = `${os.tmpdir()}${path.sep}avocado-desktop`
      const paths = await ipcRenderer.invoke("unzip", archivesPath, unzipDest)
      for (const path of paths) {
        addImageToBook(path)
      }
    })
  }
  const addImageToBook = (imagePath) => {
    if (!folder) {
      folder = imagePath
      setTimeout(() => {
        bookStore.openBook(folder, pagesPath)
      })
    }
    pagesPath.push(path.normalize(`file://${imagePath}`))
    folder = samePathBegin(folder, imagePath)
  }
  // todo corner case if drag and drop folder with files macrotask run immediately
  const onChange = (info) => {
    const { status, originFileObj, type } = info.file
    if (status !== "done") {
      return
    }
    if (type === "application/zip") {
      archivesPath.push(originFileObj.path)
      if (archivesPath.length === 1) {
        decompressAllArchivesAndAddImages()
      }
    } else {
      addImageToBook(originFileObj.path)
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
      <p>
        Click or drag file
      </p>
    </Upload.Dragger>
  )
})

export default FileExplorer
