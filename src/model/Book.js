import { makeAutoObservable } from "mobx"
import decomposeFilesToToms from "utils/decomposeFilesToToms"

class Book {
  constructor(name, path, pagesUrl = []) {
    this.path = path
    this.pagesUrl = pagesUrl
    this.name = name
    this.currentPageIndex = 0
    this._toms = decomposeFilesToToms(path, pagesUrl)
    this._currentChapter = this.updateChapter(this.toms)
    makeAutoObservable(this)
  }

  dropCurrentChapter = () => {
    this.currentChapter = null
  }

  get currentChapter() {
    return this._currentChapter
  }

  set currentChapter(value) {
    this._currentChapter = value
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

  updateChapter = (object) => {
    if (object.children?.some((child) => child.key === this.currentPage)) {
      return object
    }
    if (Array.isArray(object)) {
      return object.find(this.updateChapter)
    }
    for (const property in object) {
      if (
        Object.prototype.hasOwnProperty.call(object, property)
        && typeof object[property] === "object"
      ) {
        const res = this.updateChapter(object[property])
        if (res) {
          return res
        }
      }
    }
  }

  nextPage = () => {
    if (this.currentPageIndex < this.pagesUrl.length - 1) {
      this.currentPageIndex += 1
    }
    this.currentChapter = this.updateChapter(this.toms)
  }

  prevPage = () => {
    if (this.currentPageIndex !== 0) {
      this.currentPageIndex -= 1
    }
    this.currentChapter = this.updateChapter(this.toms)
  }

  openPage = (pageUrl) => {
    this.currentPageIndex = this.pagesUrl.indexOf(pageUrl)
  }
}

export default Book
