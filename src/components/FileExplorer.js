import React, { useContext, useState } from "react"
import { Spin, Upload } from "antd"
import { observer } from "mobx-react-lite"
import { InboxOutlined } from "@ant-design/icons"
import { StoreContext } from "store"
import samePathBegin from "utils/samePathBegin"
import * as path from "path"
import * as os from "os"
import styles from "./FileExplorer.module.sass"

// electron does not support module import of node libs
const { ipcRenderer } = window.require("electron")

const FileExplorer = observer(() => {
  const { bookStore } = useContext(StoreContext)
  const [isDecompress, setDecompress] = useState(false)
  let folder = null
  const archivesPath = []
  const pagesPath = []

  const addImageToBook = (imagePath) => {
    if (!folder) {
      folder = imagePath
      setTimeout(() => {
        bookStore.openBook(
          folder,
          pagesPath.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        )
      })
    }
    pagesPath.push(path.normalize(`file://${imagePath}`))
    folder = samePathBegin(folder, imagePath)
  }

  const decompressAllArchivesAndAddImages = () => {
    setTimeout(async () => {
      const unzipDest = `${os.tmpdir()}${path.sep}avocado-desktop`
      setDecompress(true)
      const paths = await ipcRenderer.invoke("unzip", archivesPath, unzipDest)
      setDecompress(false)
      paths.forEach((p) => {
        addImageToBook(p)
      })
    })
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
    <Spin spinning={isDecompress} tip="Opening...">
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
        <p>Click or drag file</p>
      </Upload.Dragger>
    </Spin>
  )
})

export default FileExplorer
