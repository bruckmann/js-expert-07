import prepareRunChecker from '../../../lib/shared/utils/prepareRunChecker.js'

const { shouldRun } = prepareRunChecker({ timerDelay: 200 })
export default class HandGestureController {
  #view
  #service
  #camera
  #lastDirection = {
    direction: '',
    y: 0,
  }

  constructor({ view, service, camera }) {
    this.#view = view
    this.#service = service
    this.#camera = camera
  }

  async init() {
    return this.#loop()
  }

  #scrollPage(direction) {
    const pixelsPerScroll = 100
    if (this.#lastDirection.direction === direction) {
      this.#lastDirection.y =
        direction === 'scroll-down'
          ? this.#lastDirection.y + pixelsPerScroll
          : this.#lastDirection.y - pixelsPerScroll
    } else {
      this.#lastDirection.direction = direction
    }

    this.#view.scrollPage(this.#lastDirection.y)
  }

  async #estimateHands() {
    try {
      const hands = await this.#service.estimateHands(this.#camera.video)
      this.#view.clear()
      if (hands?.length) {
        this.#view.drawResult(hands)
      }
      for await (const gesture of this.#service.detectGestures(hands)) {
        const { event, x, y } = gesture
        console.log(event)
        if (event === 'click') {
          if (!shouldRun()) continue
          this.#view.clickOnElement(x, y)
          continue
        }
        if (event.includes('scroll')) {
          if (!shouldRun()) continue
          this.#scrollPage(event)
        }
      }
    } catch (error) {
      console.log('[HandGestureController]: ', error)
    }
  }

  async #loop() {
    await this.#service.initializeDetector()
    await this.#estimateHands()
    this.#view.loop(this.#loop.bind(this))
  }

  static async initialize(deps) {
    const controller = new HandGestureController(deps)
    return controller.init()
  }
}
