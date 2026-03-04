import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { useTvControl } from '../useTvControl'

vi.mock('axios')

describe('useTvControl', () => {
  const HOST = 'http://192.168.72.20:8080'
  let tv: ReturnType<typeof useTvControl>

  beforeEach(() => {
    vi.clearAllMocks()
    tv = useTvControl(HOST)
  })

  it('powerOn sends PowerOn command', async () => {
    await tv.powerOn()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'PowerOn' })
  })

  it('powerOff sends PowerOff command', async () => {
    await tv.powerOff()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'PowerOff' })
  })

  it('channelUp sends ChannelUp command', async () => {
    await tv.channelUp()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'ChannelUp' })
  })

  it('channelDown sends ChannelDown command', async () => {
    await tv.channelDown()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'ChannelDown' })
  })

  it('navigation commands send correct POST calls', async () => {
    await tv.up()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'Up' })

    await tv.down()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'Down' })

    await tv.left()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'Left' })

    await tv.right()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'Right' })

    await tv.enter()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'Enter' })
  })

  it('setInput sends the input command directly', async () => {
    await tv.setInput('HDMI1')
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'HDMI1' })
  })

  it('media commands send correct POST calls', async () => {
    await tv.play()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'Play' })

    await tv.rewind()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'Rewind' })

    await tv.fastForward()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}/tv/actions`, { command: 'FastForward' })
  })
})
