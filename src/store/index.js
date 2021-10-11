import { makeAutoObservable } from "mobx"
import React from "react"
import BookStore from "./BookStore"
import BookViewerStore from "./BookViewerStore"

class RootStore {
  constructor() {
    this.bookStore = new BookStore()
    this.bookViewerStore = new BookViewerStore()
    makeAutoObservable(this)
  }
}

export const rootStore = new RootStore()

export const StoreContext = React.createContext(rootStore)

export default RootStore
