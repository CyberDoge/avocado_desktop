import {makeAutoObservable} from "mobx";

class ImgDataStore {
  constructor() {
    makeAutoObservable(this)
    this.images = []
  }


  addImage(image) {
    this.images = image
  }
}

export default ImgDataStore
