import {makeAutoObservable} from "mobx";
import BookStore from "./BookStore";
import React from "react"

class RootStore {
  constructor() {
    this.bookStore = new BookStore()
    makeAutoObservable(this)
  }
}

export const StoreContext = React.createContext({});

export default RootStore
