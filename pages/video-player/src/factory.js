import Camera from '../../lib/shared/camera.js'
import { supportsWorkerType } from '../../lib/shared/utils.js'
import Controller from './controller.js'
import View from './view.js'

async function getWorker() {
  if (supportsWorkerType()) {
    const worker = new Worker('./src/worker.js', { type: 'module' })
    return worker
  } else {
    const workerMock = {
      async postMessage() {},
      onmessage(msg) {
        console.log(msg)
      },
    }
    return workerMock
  }
}

const worker = await getWorker()
const camera = await Camera.init()

const factory = {
  async initalize() {
    return Controller.initialize({
      view: new View(),
      worker,
      camera,
    })
  },
}

export default factory
