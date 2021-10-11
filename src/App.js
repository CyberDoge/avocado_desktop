import "./App.css"
import React from "react"
import { observer } from "mobx-react-lite"
import BookViewer from "components/Book/BookViewer"
import FileExplorer from "components/FileExplorer"
import { StoreContext, rootStore } from "store"

const App = observer(() => (
  <StoreContext.Provider value={rootStore}>
    <div className="App">
      {rootStore.bookStore.currentBook ? <BookViewer /> : <FileExplorer />}
    </div>
  </StoreContext.Provider>
))

export default App
