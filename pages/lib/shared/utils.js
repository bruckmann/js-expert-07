function supportsWorkerType() {
  let supports = false
  const tester = {
    get type() {
      supports = true
    }, // it's been called, it's supported
  }
  try {
    new Worker('blob://', tester)
  } finally {
    return supports
  }
}

function prepareRunChecker({ timerDelay }) {
  let lastEvent = Date.now()
  return {
    shouldRun() {
      const result = Date.now() - lastEvent > timerDelay
      if (result) lastEvent = Date.now()

      return result
    },
  }
}

export { supportsWorkerType, prepareRunChecker }
