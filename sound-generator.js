let context, oscillator, gain

const debug = (message) => {
    console.log(message)
}

const init = (frequency = 440.0, type = 'sine') => {
    context = new AudioContext()
    oscillator = context.createOscillator()
    gain = context.createGain()
    oscillator.type = type
    oscillator.connect(gain)
    oscillator.frequency.value = frequency

    gain.connect(context.destination)
    debug(`Initialised the context, oscillator (using ${frequency} as a ${type} frequency) and gain`)
}

const start = (time = 0) => {
    oscillator.start(0)

    debug('Started playing the sound')

    if (time) {
      setTimeout(stop, time * 1000)
    }
}

const stop = () => {
    oscillator.stop()
    debug('Stopped playing the sound')
}

$(() => {
  const startBtn = $("#startBtn")
  const stopBtn = $("#stopBtn")

  startBtn.click(() => {
    const freqVal = $("#freqVal").val()
    const freqType = $("#freqType").val() || 'sine'
    const freqDuration = $("#freqDuration").val() || 3

    debug(`Clicked start using frequency ${freqVal}`)
    init(freqVal, freqType)
    start(freqDuration)
  })
  stopBtn.click(() => {
    debug('Clicked stop')
    stop()
  })
})
