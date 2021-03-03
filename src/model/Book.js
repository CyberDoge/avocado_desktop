import { makeAutoObservable } from "mobx"

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
