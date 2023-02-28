export default class View {
  #btnInit = document.querySelector('#init')
  #statusElement = document.querySelector('#status')
  #videoFrameCanvas = document.createElement('canvas')
  #canvasContent = this.#videoFrameCanvas.getContext('2d', { willReadFrequently: true })
  #videoElement = document.querySelector('#video')

  getVideoFrame(video) {
    const canvas = this.#videoFrameCanvas
    const [width, height] = [video.videoWidth, video.videoHeight]
    canvas.width = width
    canvas.height = height

    this.#canvasContent.drawImage(video, 0, 0, width, height)
    return this.#canvasContent.getImageData(0, 0, width, height)
  }

  togglePlayVideo() {
    if (this.#videoElement.paused) {
      this.#videoElement.play()
      return
    }

    this.#videoElement.pause()
  }

  enableButton() {
    this.#btnInit.disabled = false
  }

  configureOnBtnClick(fn) {
    this.#btnInit.addEventListener('click', fn)
  }

  logger(text) {
    this.#statusElement.innerHTML = text
  }
}
