export default class HandGestureView {
  #handCanvas = document.querySelector('#hands')
  #handsCanvasContext = this.#handCanvas.getContext('2d')
  #fingerLookupindexes
  #styler

  constructor({ FINGER_LOOKUP_INDEXES, styler }) {
    this.#handCanvas.width = globalThis.screen.availWidth
    this.#handCanvas.height = globalThis.screen.availHeight
    this.#fingerLookupindexes = FINGER_LOOKUP_INDEXES
    this.#styler = styler

    setTimeout(() => {
      styler.loadDocumentStyles()
    }, 200)
  }

  clear() {
    this.#handsCanvasContext.clearRect(0, 0, this.#handCanvas.width, this.#handCanvas.height)
  }

  drawResult(hands) {
    for (const { keypoints, handedness } of hands) {
      if (!keypoints) continue
      console.log(handedness)
      this.#handsCanvasContext.fillStyle = handedness === 'Left' ? 'red' : 'green'
      this.#handsCanvasContext.strokeStyle = 'white'
      this.#handsCanvasContext.lineWidth = 8
      this.#handsCanvasContext.lineJoin = 'round'
      this.#drawKnucles(keypoints)
      this.#drawFingersAndHoverElements(keypoints)
    }
  }

  #drawKnucles(keypoints) {
    for (const { x, y } of keypoints) {
      this.#handsCanvasContext.beginPath()
      const newX = x - 2
      const newY = y - 2
      const radius = 3
      const startAngle = 0
      const endAngle = 2 * Math.PI

      this.#handsCanvasContext.arc(newX, newY, radius, startAngle, endAngle)
      this.#handsCanvasContext.fill()
    }
  }

  #drawFingersAndHoverElements(keypoints) {
    const fingers = Object.keys(this.#fingerLookupindexes)
    for (const finger of fingers) {
      const points = this.#fingerLookupindexes[finger].map((index) => keypoints[index])
      const region = new Path2D()
      const { x, y } = points
      region.moveTo(x, y)
      for (const point of points) {
        region.lineTo(point.x, point.y)
      }
      this.#handsCanvasContext.stroke(region)
      this.#hoverElement(finger, points)
    }
  }

  #hoverElement(finger, points) {
    if (finger != 'indexFinger') return

    const tip = points.find((item) => item.name === 'index_finger_tip')
    const element = document.elementFromPoint(tip.x, tip.y)
    if (!element) return
    this.#styler.toggleStyle(element, ':hover')
    setTimeout(() => {
      this.#styler.toggleStyle(element, ':hover')
    }, 500)
  }

  clickOnElement(x, y) {
    const element = document.elementFromPoint(x, y)
    if (!element) return
    const rect = element.getBoundingClientRect()
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: rect.left + x,
      clientY: rect.left + y,
    })
    element.dispatchEvent(event)
  }

  loop(fn) {
    requestAnimationFrame(fn)
  }

  scrollPage(top) {
    scroll({
      top,
      behavior: 'smooth',
    })
  }
}
