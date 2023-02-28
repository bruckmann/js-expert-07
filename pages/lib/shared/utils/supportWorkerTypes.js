export default function supportsWorkerType() {
  let supports = false
  const tester = {
    get type() {
      supports = true
    },
  }
  try {
    new Worker('blob://', tester)
  } finally {
    return supports
  }
}
