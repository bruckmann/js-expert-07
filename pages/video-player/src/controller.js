import { EVENTS } from '../../lib/shared/constants.js'

export default class Controller {
  #view
  #worker
  #camera
  #blinkCounter
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
        // TODO put this READY command into a config file
        this.#view.enableButton()
        ready = true
        return
      }

      const blinked = data.blinked
      this.#blinkCounter += blinked
      this.#view.togglePlayVideo()
      console.log('blinked', blinked)
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
    this.#blinkCounter = 0
    this.loop()
  }

  logger(text) {
    const times = `   - blinked times ${this.#blinkCounter}`
    this.#view.logger(`logger: ${text}`.concat(this.#blinkCounter ? times : ''))
  }

  async init() {}
}
