onmessage = (data) => {
  let counter = 0

  for (; counter < data.maxItems; counter++) console.log('.')

  postMessage({
    response: 'ok',
  })
}
