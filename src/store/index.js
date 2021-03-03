import { makeAutoObservable } from "mobx"
import BookStore from "./BookStore"
import React from "react"
import BookViewerStore from "./BookViewerStore"

class RootStore {
  constructor() {
    this.bookStore = new BookStore()
    this.bookViewerStore = new BookViewerStore()
    makeAutoObservable(this)
  }
}

export const StoreContext = React.createContext({})

export default RootStore
