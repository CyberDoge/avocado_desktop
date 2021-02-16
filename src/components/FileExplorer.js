import React from "react"
import { message, Upload } from "antd"
import { observer } from "mobx-react-lite"
import { InboxOutlined } from "@ant-design/icons"
import styles from "./FileExplorer.module.sass"

const FileExplorer = observer(() => {
  const props = {
    name: "file",
    multiple: true,
    onChange(info) {
      const { status } = info.file
      if (status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  return (
    <Upload.Dragger {...props}>
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
