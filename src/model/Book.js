import {makeAutoObservable} from "mobx";

class Book {
  constructor(path, name, pagesUrl = []) {
    this.path = path
    this.pagesUrl = pagesUrl
    this.name = name
    this.currentPageIndex = 0
    makeAutoObservable(this)
  }

  get currentPage() {
    return this.pagesUrl[this.currentPageIndex]
  }

  openPage(pageUrl) {
    this.currentPageIndex = this.pagesUrl.indexOf(pageUrl)
  }
}

export default Book
