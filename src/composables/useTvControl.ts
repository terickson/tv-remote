import axios from 'axios'

export function useTvControl(tvHost: string) {
  async function sendCommand(command: string, value?: string | null) {
    const body: Record<string, string> = { command }
    if (value) {
      body.value = value
    }
    await axios.post(`${tvHost}/tv/actions`, body)
  }

  const powerOn = () => sendCommand('PowerOn')
  const powerOff = () => sendCommand('PowerOff')
  const channelUp = () => sendCommand('ChannelUp')
  const channelDown = () => sendCommand('ChannelDown')
  const volumeUp = () => sendCommand('VolumeUp')
  const volumeDown = () => sendCommand('VolumeDown')
  const up = () => sendCommand('Up')
  const down = () => sendCommand('Down')
  const left = () => sendCommand('Left')
  const right = () => sendCommand('Right')
  const enter = () => sendCommand('Enter')
  const back = () => sendCommand('Back')
  const menu = () => sendCommand('Menu')
  const exit = () => sendCommand('Exit')
  const smart = () => sendCommand('Smart')
  const play = () => sendCommand('Play')
  const rewind = () => sendCommand('Rewind')
  const fastForward = () => sendCommand('FastForward')
  const setInput = (input: string) => sendCommand(input)

  return {
    sendCommand,
    powerOn,
    powerOff,
    channelUp,
    channelDown,
    volumeUp,
    volumeDown,
    up,
    down,
    left,
    right,
    enter,
    back,
    menu,
    exit,
    smart,
    play,
    rewind,
    fastForward,
    setInput,
  }
}
