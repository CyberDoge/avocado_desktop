import {action, makeAutoObservable, observable} from "mobx";

class ImgDataStore {
  constructor() {
    this.images = []
    makeAutoObservable(this, {
      images: observable,
      addImage: action,
      foo: observable
    })
  }

  addImage(image) {
    this.images.push(image)
  }
}

export default ImgDataStore
