import { makeAutoObservable } from "mobx"
import decomposeFilesToFolder from "../utils/decomposeFilesToFolder"

class Book {
  constructor(name, path, pagesUrl = []) {
    this.path = path
    this.pagesUrl = pagesUrl
    this._toms = decomposeFilesToFolder(path, pagesUrl)
    this.name = name
    this.currentPageIndex = 0
    makeAutoObservable(this)
  }

  get toms() {
    return this._toms
  }

  get currentPage() {
    return this.pagesUrl[this.currentPageIndex]
  }

  get isLastPage() {
    return this.currentPageIndex === this.pagesUrl.length - 1
  }

  nextPage = () => {
    if (this.currentPageIndex < this.pagesUrl.length - 1) {
      ++this.currentPageIndex
    }
  }

  prevPage = () => {
    if (this.currentPageIndex !== 0) --this.currentPageIndex
  }

  openPage = (pageUrl) => {
    this.currentPageIndex = this.pagesUrl.indexOf(pageUrl)
  }
}

export default Book
