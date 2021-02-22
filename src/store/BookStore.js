import {makeAutoObservable} from "mobx";
import Book from "../model/Book";
import {basename} from "path"

class BookStore {
  constructor() {
    this.books = new Map()
    this.currentBookPath = null
    this._isFullScreen = false
    makeAutoObservable(this)
  }

  get isFullScreen() {
    return this._isFullScreen;
  }

  set isFullScreen(value) {
    this._isFullScreen = value;
  }

  get currentBook() {
    return this.books.get(this.currentBookPath)
  }

  openBook(path, pages) {
    this.books.set(path, new Book(path, basename(path), pages))
    this.currentBookPath = path
  }

}

export default BookStore
