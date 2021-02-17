import React, {useContext} from 'react';
import ImageScene from "./ImageScene";
import {StoreContext} from "../../context/storeContext";
import {observer} from "mobx-react-lite";

const BookViewer = observer(() => {
  const {imgDataStore} = useContext(StoreContext)
  return (
    <div>
      {
        imgDataStore.images.map(img => (
          <ImageScene key={img.src} imgAlt={img.alt} imgSrc={img.src}/>
        ))}
    </div>
  );
});

export default BookViewer;
