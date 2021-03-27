import { useEffect, useState } from "react"

const initialMouseCoords = {
  startPosition: null,
  minPosition: Number.MAX_SAFE_INTEGER,
  maxPosition: Number.MIN_SAFE_INTEGER
}

const useMouseDragTmp = (callback) => {
  const [mouseCoordsX, setMouseCoordsX] = useState({ ...initialMouseCoords })
  const [clientX, setClientX] = useState(Number.MAX_SAFE_INTEGER)
  const [resetTimeout, setResetTimeout] = useState(0)
  const [detectDragTimeout, setDetectDragTimeout] = useState(0)
  useEffect(() => {
    if(!mouseCoordsX.startPosition){
      return
    }
    clearTimeout(detectDragTimeout)
    const newDetectDragTimeout = setTimeout(() => {
      console.log(mouseCoordsX.startPosition - mouseCoordsX.minPosition, mouseCoordsX.maxPosition - mouseCoordsX.startPosition)
      if (
        mouseCoordsX.startPosition - mouseCoordsX.minPosition > 70 &&
        mouseCoordsX.maxPosition - mouseCoordsX.startPosition > 70
      ) {
        const clear = callback()
        clearTimeout(resetTimeout)
        const newResetTimeout = setTimeout(() => {
          clear()
        }, 1500)
        setResetTimeout(newResetTimeout)
      }
      setClientX(Number.MAX_SAFE_INTEGER)
      setMouseCoordsX({ ...initialMouseCoords })
    }, 700)
    setDetectDragTimeout(newDetectDragTimeout)
  }, [mouseCoordsX.startPosition])
  useEffect(() => {
    if (!mouseCoordsX.startPosition) {
      console.log("updated")
      mouseCoordsX.startPosition = clientX
    }
  }, [clientX])
  mouseCoordsX.minPosition = Math.min(clientX, mouseCoordsX.minPosition)
  mouseCoordsX.maxPosition = Math.max(clientX, mouseCoordsX.maxPosition)
  return setClientX
}

export default useMouseDragTmp