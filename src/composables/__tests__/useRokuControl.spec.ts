import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { useRokuControl } from '../useRokuControl'

vi.mock('axios')

describe('useRokuControl', () => {
  const HOST = 'http://192.168.72.91:8080'
  const SYSTEM_PATH = '/systems/family-room/actions'
  let roku: ReturnType<typeof useRokuControl>

  beforeEach(() => {
    vi.clearAllMocks()
    roku = useRokuControl(HOST, SYSTEM_PATH)
  })

  it('navigation commands send correct POST calls with value "1"', async () => {
    await roku.up()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}${SYSTEM_PATH}`, { command: 'up', value: '1' })

    await roku.down()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}${SYSTEM_PATH}`, { command: 'down', value: '1' })

    await roku.left()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}${SYSTEM_PATH}`, { command: 'left', value: '1' })

    await roku.right()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}${SYSTEM_PATH}`, { command: 'right', value: '1' })
  })

  it('select sends select command without value', async () => {
    await roku.select()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}${SYSTEM_PATH}`, { command: 'select' })
  })

  it('back sends back command', async () => {
    await roku.back()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}${SYSTEM_PATH}`, { command: 'back' })
  })

  it('home sends home command', async () => {
    await roku.home()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}${SYSTEM_PATH}`, { command: 'home' })
  })

  it('media commands send correct POST calls', async () => {
    await roku.play()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}${SYSTEM_PATH}`, { command: 'play' })

    await roku.reverse()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}${SYSTEM_PATH}`, { command: 'reverse' })

    await roku.forward()
    expect(axios.post).toHaveBeenCalledWith(`${HOST}${SYSTEM_PATH}`, { command: 'forward' })
  })

  it('launchApp sends input command with app name', async () => {
    await roku.launchApp('Netflix')
    expect(axios.post).toHaveBeenCalledWith(`${HOST}${SYSTEM_PATH}`, {
      command: 'input',
      value: 'Netflix',
    })
  })
})
