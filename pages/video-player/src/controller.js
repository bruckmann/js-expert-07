import { EVENTS } from '../../lib/shared/config/constants.js'

export default class Controller {
  #view
  #worker
  #camera
  #rightBlinkCounter
  #leftBlinkCounter

  constructor({ view, worker, camera }) {
    this.#view = view
    this.#worker = this.configureWorker(worker)
    this.#camera = camera
    this.#view.configureOnBtnClick(this.onBtnStart.bind(this))
  }

  static async initialize(deps) {
    const controller = new Controller(deps)
    controller.logger('For now the eye blink recognition is disabled, click in the button to start')
    return controller.init()
  }

  configureWorker(worker) {
    let ready = false

    worker.onmessage = ({ data }) => {
      if (data === EVENTS.READY) {
        this.#view.enableButton()
        ready = true
        return
      }

      const { rightBlinked, leftBlinked } = data
      this.#rightBlinkCounter += rightBlinked
      this.#leftBlinkCounter += leftBlinked
      this.#view.togglePlayVideo()
    }

    return {
      send(msg) {
        if (!ready) return
        worker.postMessage(msg)
      },
    }
  }

  loop() {
    const video = this.#camera.video
    const img = this.#view.getVideoFrame(video)
    this.#worker.send(img)
    this.logger('Detecting eye blinking')

    setTimeout(() => this.loop(), 100)
  }

  onBtnStart() {
    this.logger('initializing detection...')
    this.#rightBlinkCounter = 0
    this.#leftBlinkCounter = 0
    this.loop()
  }

  logger(text) {
    const times = `   - right blinked times ${this.#rightBlinkCounter}, left blinked times ${this.#leftBlinkCounter}`
    this.#view.logger(`logger: ${text}`.concat(this.#rightBlinkCounter || this.#leftBlinkCounter ? times : ''))
  }

  async init() { }
}
