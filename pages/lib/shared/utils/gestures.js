const { GestureDescription, Finger, FingerCurl } = window.fp

const ScrollUpGesture = new GestureDescription('scroll-up') // ✊️
const ScrollDownGesture = new GestureDescription('scroll-down') // 🖐
ScrollUpGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
ScrollUpGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5)

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0)
  ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0)
}

// OpenedHandGesture
// -----------------------------------------------------------------------------

for (let finger of Finger.all) {
  ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0)
}

const knownGestures = [ScrollUpGesture, ScrollDownGesture]

const stringGestures = {
  'scroll-up': '✊️',
  'scroll-down': '🖐',
}

export { knownGestures, stringGestures }
