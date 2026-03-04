import axios from 'axios'

export function useRokuControl(rokuHost: string, systemPath: string) {
  const actionUrl = `${rokuHost}${systemPath}`

  async function sendCommand(command: string, value?: string | null) {
    const body: Record<string, string> = { command }
    if (value) {
      body.value = value
    }
    await axios.post(actionUrl, body)
  }

  const up = () => sendCommand('up', '1')
  const down = () => sendCommand('down', '1')
  const left = () => sendCommand('left', '1')
  const right = () => sendCommand('right', '1')
  const select = () => sendCommand('select')
  const back = () => sendCommand('back')
  const home = () => sendCommand('home')
  const play = () => sendCommand('play')
  const reverse = () => sendCommand('reverse')
  const forward = () => sendCommand('forward')
  const launchApp = (appName: string) => sendCommand('input', appName)

  return {
    sendCommand,
    up,
    down,
    left,
    right,
    select,
    back,
    home,
    play,
    reverse,
    forward,
    launchApp,
  }
}
