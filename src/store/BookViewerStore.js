import { makeAutoObservable } from "mobx"

class BookViewerStore {
  constructor() {
    this._isFullScreen = false
    this._isDrawerOpen = false
    this._isForceShowControl = false
    makeAutoObservable(this)
  }

  get isForceShowControl() {
    return this._isForceShowControl
  }

  set isForceShowControl(value) {
    this._isForceShowControl = value
  }

  get isDrawerOpen() {
    return this._isDrawerOpen
  }

  set isDrawerOpen(value) {
    this._isDrawerOpen = value
  }

  get isFullScreen() {
    return this._isFullScreen
  }

  set isFullScreen(value) {
    this._isFullScreen = value
  }
}

export default BookViewerStore
