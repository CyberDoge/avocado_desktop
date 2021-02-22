import React, {useContext} from 'react';
import {StoreContext} from "../../store";
import {observer} from "mobx-react-lite";

const ImageScene = observer(({alt = "scene", ...rest}) => {
  const {bookStore} = useContext(StoreContext)
  return (
    <img onClick={() => {
      bookStore.isFullScreen && bookStore.currentBook.nextPage()
    }} draggable={false}
         alt={alt} {...rest}/>
  );
});

export default ImageScene;
