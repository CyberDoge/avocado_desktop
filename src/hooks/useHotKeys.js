import { useContext, useEffect } from "react"
import { StoreContext } from "store"

const useHotKeys = () => {
  const { bookStore, bookViewerStore } = useContext(StoreContext)

  useEffect(() => {
    const onfullscreenchange = () => {
      bookViewerStore.isFullScreen = !bookViewerStore.isFullScreen
    }
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        if (bookStore.currentBook.isLastPage && bookViewerStore.isFullScreen) {
          document.exitFullscreen()
        }
        bookStore.currentBook.nextPage()
      } else if (event.key === "ArrowLeft") {
        bookStore.currentBook.prevPage()
      } else if (
        event.key === " "
        && bookViewerStore.isFullScreen
        && !bookViewerStore.isFullWidth
      ) {
        event.preventDefault()
        if (event.shiftKey) {
          bookStore.currentBook.prevPage()

          return
        }
        if (bookStore.currentBook.isLastPage) {
          document.exitFullscreen()
        }
        bookStore.currentBook.nextPage()
      }
    }
    document.addEventListener("fullscreenchange", onfullscreenchange)
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("fullscreenchange", onfullscreenchange)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [
    bookViewerStore.isFullScreen,
    bookStore.currentBook,
    bookStore,
    bookViewerStore
  ])
}

export default useHotKeys
