import { makeAutoObservable } from "mobx"
import Book from "model/Book"
import { basename } from "path"

class BookStore {
  constructor() {
    this.books = new Map()
    this.currentBookPath = null
    makeAutoObservable(this)
  }

  get currentBook() {
    return this.books.get(this.currentBookPath)
  }

  dropCurrentBook = () => {
    this.currentBookPath = null
  }

  openBook = (path, pages) => {
    pages.sort()
    this.books.set(path, new Book(basename(path), path, pages))
    this.currentBookPath = path
  }
}

export default BookStore
