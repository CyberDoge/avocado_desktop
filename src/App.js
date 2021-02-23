import "./App.css"
import FileExplorer from "./components/FileExplorer"
import React from "react"
import BookViewer from "./components/Book/BookViewer";
import {observer} from "mobx-react-lite";
import RootStore, {StoreContext} from "./store";

const rootStore = new RootStore();
const App = observer(() => {
  return (
    <StoreContext.Provider value={rootStore}>
      <div className="App">
        {rootStore.bookStore.currentBook ?
          <BookViewer/> :
          <FileExplorer/>
        }
      </div>
    </StoreContext.Provider>
  )
})

export default App
