import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { useDeviceApi } from '../useDeviceApi'

vi.mock('axios')

describe('useDeviceApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const { postAction, putReceiver, postRokuRoomAction } = useDeviceApi()

  it('postAction sends POST with command and value', async () => {
    await postAction('http://host:8080', 'PowerOn', 'test')
    expect(axios.post).toHaveBeenCalledWith('http://host:8080/tv/actions', {
      command: 'PowerOn',
      value: 'test',
    })
  })

  it('postAction omits value when null', async () => {
    await postAction('http://host:8080', 'PowerOff')
    expect(axios.post).toHaveBeenCalledWith('http://host:8080/tv/actions', {
      command: 'PowerOff',
    })
  })

  it('putReceiver sends PUT with payload', async () => {
    const payload = { volume: -30, on: true }
    await putReceiver('http://host:8081', payload)
    expect(axios.put).toHaveBeenCalledWith('http://host:8081/receiver/', payload)
  })

  it('postRokuRoomAction sends POST to room-specific path', async () => {
    await postRokuRoomAction('http://host:8080', '/systems/family-room/actions', 'input', 'Netflix')
    expect(axios.post).toHaveBeenCalledWith('http://host:8080/systems/family-room/actions', {
      command: 'input',
      value: 'Netflix',
    })
  })
})
