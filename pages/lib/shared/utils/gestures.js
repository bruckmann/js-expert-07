const { GestureDescription, Finger, FingerCurl } = window.fp

const ScrollUpGesture = new GestureDescription('scroll-up')
const ScrollDownGesture = new GestureDescription('scroll-down')
const ClickDownGesture = new GestureDescription('click')

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

// ClickGesture
// -----------------------------------------------------------------------------

ClickDownGesture.addCurl(Finger.index, FingerCurl.HalfCurl, 0.8)
ClickDownGesture.addCurl(Finger.index, FingerCurl.FullCurl, 0.5)

ClickDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
ClickDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.4)

ClickDownGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0)
ClickDownGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 0.9)

ClickDownGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0)
ClickDownGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.9)

ClickDownGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0)
ClickDownGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.9)

const knownGestures = [ScrollUpGesture, ScrollDownGesture, ClickDownGesture]

const stringGestures = {
  'scroll-up': '✊️',
  'scroll-down': '🖐',
}

export { knownGestures, stringGestures }
