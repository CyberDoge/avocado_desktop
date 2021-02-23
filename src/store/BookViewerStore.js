import {makeAutoObservable} from "mobx";

class BookViewerStore {
  constructor() {
    this._isFullScreen = false
    this._isDrawerOpen = false
    makeAutoObservable(this)
  }

  get isDrawerOpen() {
    return this._isDrawerOpen;
  }

  set isDrawerOpen(value) {
    this._isDrawerOpen = value;
  }

  get isFullScreen() {
    return this._isFullScreen;
  }

  set isFullScreen(value) {
    this._isFullScreen = value;
  }

}

export default BookViewerStore
