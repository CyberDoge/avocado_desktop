import {makeAutoObservable} from "mobx";
import ImgDataStore from "./ImgDataStore";

class RootStore {
  constructor() {
    makeAutoObservable(this)
    this.imgDataStore = new ImgDataStore()
  }
}

export default RootStore
