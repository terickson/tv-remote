import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { useInputSwitcher } from '../useInputSwitcher'
import type { RoomConfig } from '@/config/types'

vi.mock('axios')

describe('useInputSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  const familyRoom: RoomConfig = {
    id: 'family-room',
    name: 'Family Room Remote',
    tvHost: 'http://192.168.72.20:8080',
    rokuHost: 'http://192.168.72.222:8080',
    receiverHost: 'http://192.168.72.222:8081',
    inputs: [
      { display: 'Off', value: null },
      { display: 'TV', value: 'TV', receiverInput: 'AV1', tvInput: 'InputTV' },
      { display: 'Roku', value: 'Roku', receiverInput: 'HDMI1', tvInput: 'HDMI1' },
      { display: 'PS3', value: 'PS3', receiverInput: 'HDMI4', tvInput: 'HDMI1' },
      { display: 'PS4', value: 'PS4', receiverInput: 'HDMI2', tvInput: 'HDMI1' },
      { display: 'PS5', value: 'PS5', receiverInput: 'AV1', tvInput: 'HDMI3' },
      { display: 'WII U', value: 'WII U', receiverInput: 'HDMI3', tvInput: 'HDMI1' },
      { display: 'Retro PI', value: 'Retro PI', receiverInput: 'AV1', tvInput: 'HDMI2' },
      { display: 'Xbox', value: 'Xbox', receiverInput: 'V-AUX', tvInput: 'HDMI1' },
      { display: 'Switch', value: 'Switch', receiverInput: 'HDMI5', tvInput: 'HDMI1' },
    ],
    quickLaunches: [
      { display: 'Netflix', rokuAppName: 'Netflix' },
      { display: 'Plex', rokuAppName: 'Plex' },
    ],
    volume: { type: 'receiver', defaultVolume: -30, intervals: [1, 5, 10] },
  }

  const masterBedroom: RoomConfig = {
    id: 'master-bedroom',
    name: 'Master Bedroom Remote',
    tvHost: 'http://192.168.72.25:8080',
    rokuHost: 'http://192.168.72.222:8080',
    inputs: [
      { display: 'Off', value: null },
      { display: 'TV', value: 'TV', tvInput: 'InputTV' },
      { display: 'Roku', value: 'Roku', tvInput: 'HDMI1' },
      { display: 'PS2', value: 'PS2', tvInput: 'InputAV1' },
      { display: 'WII', value: 'WII', tvInput: 'InputComponent1' },
      { display: 'Switch', value: 'Switch', tvInput: 'HDMI2' },
    ],
    quickLaunches: [{ display: 'Netflix', rokuAppName: 'Netflix' }],
    volume: { type: 'tv', defaultVolume: 0 },
  }

  describe('Family Room - Off', () => {
    it('powers off TV and receiver', async () => {
      const resetVolume = vi.fn()
      const { changeInput } = useInputSwitcher(familyRoom, resetVolume)

      await changeInput(null)

      expect(resetVolume).toHaveBeenCalled()
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.20:8080/tv/actions',
        { command: 'PowerOff' }
      )
      expect(axios.put).toHaveBeenCalledWith(
        'http://192.168.72.222:8081/receiver/',
        { on: false, volume: -30 }
      )
    })
  })

  describe('Family Room - TV input', () => {
    it('sets receiver to AV1, powers on TV, switches to InputTV after delay', async () => {
      const resetVolume = vi.fn()
      const { changeInput } = useInputSwitcher(familyRoom, resetVolume)

      await changeInput('TV')

      expect(axios.put).toHaveBeenCalledWith(
        'http://192.168.72.222:8081/receiver/',
        { on: true, volume: -30, input: 'AV1' }
      )
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.20:8080/tv/actions',
        { command: 'PowerOn' }
      )

      vi.advanceTimersByTime(500)
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.20:8080/tv/actions',
        { command: 'InputTV' }
      )
    })
  })

  describe('Family Room - PS3 input', () => {
    it('sets receiver to HDMI4, TV to HDMI1', async () => {
      const resetVolume = vi.fn()
      const { changeInput } = useInputSwitcher(familyRoom, resetVolume)

      await changeInput('PS3')

      expect(axios.put).toHaveBeenCalledWith(
        'http://192.168.72.222:8081/receiver/',
        { on: true, volume: -30, input: 'HDMI4' }
      )
      vi.advanceTimersByTime(500)
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.20:8080/tv/actions',
        { command: 'HDMI1' }
      )
    })
  })

  describe('Family Room - PS5 input', () => {
    it('sets receiver to AV1, TV to HDMI3', async () => {
      const resetVolume = vi.fn()
      const { changeInput } = useInputSwitcher(familyRoom, resetVolume)

      await changeInput('PS5')

      expect(axios.put).toHaveBeenCalledWith(
        'http://192.168.72.222:8081/receiver/',
        { on: true, volume: -30, input: 'AV1' }
      )
      vi.advanceTimersByTime(500)
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.20:8080/tv/actions',
        { command: 'HDMI3' }
      )
    })
  })

  describe('Family Room - Retro PI input', () => {
    it('sets receiver to AV1, TV to HDMI2', async () => {
      const resetVolume = vi.fn()
      const { changeInput } = useInputSwitcher(familyRoom, resetVolume)

      await changeInput('Retro PI')

      expect(axios.put).toHaveBeenCalledWith(
        'http://192.168.72.222:8081/receiver/',
        { on: true, volume: -30, input: 'AV1' }
      )
      vi.advanceTimersByTime(500)
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.20:8080/tv/actions',
        { command: 'HDMI2' }
      )
    })
  })

  describe('Family Room - Xbox input', () => {
    it('sets receiver to V-AUX, TV to HDMI1', async () => {
      const resetVolume = vi.fn()
      const { changeInput } = useInputSwitcher(familyRoom, resetVolume)

      await changeInput('Xbox')

      expect(axios.put).toHaveBeenCalledWith(
        'http://192.168.72.222:8081/receiver/',
        { on: true, volume: -30, input: 'V-AUX' }
      )
      vi.advanceTimersByTime(500)
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.20:8080/tv/actions',
        { command: 'HDMI1' }
      )
    })
  })

  describe('Family Room - Switch input', () => {
    it('sets receiver to HDMI5, TV to HDMI1', async () => {
      const resetVolume = vi.fn()
      const { changeInput } = useInputSwitcher(familyRoom, resetVolume)

      await changeInput('Switch')

      expect(axios.put).toHaveBeenCalledWith(
        'http://192.168.72.222:8081/receiver/',
        { on: true, volume: -30, input: 'HDMI5' }
      )
      vi.advanceTimersByTime(500)
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.20:8080/tv/actions',
        { command: 'HDMI1' }
      )
    })
  })

  describe('Family Room - Quick Launch', () => {
    it('launches Netflix: sets receiver to HDMI1, launches Roku app, powers TV to HDMI1', async () => {
      const resetVolume = vi.fn()
      const { quickLaunch } = useInputSwitcher(familyRoom, resetVolume)

      await quickLaunch({ display: 'Netflix', rokuAppName: 'Netflix' })

      expect(axios.put).toHaveBeenCalledWith(
        'http://192.168.72.222:8081/receiver/',
        { on: true, volume: -30, input: 'HDMI1' }
      )
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.222:8080/systems/family-room/actions',
        { command: 'input', value: 'Netflix' }
      )
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.20:8080/tv/actions',
        { command: 'PowerOn' }
      )
      vi.advanceTimersByTime(500)
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.20:8080/tv/actions',
        { command: 'HDMI1' }
      )
    })
  })

  describe('Master Bedroom - Off', () => {
    it('powers off TV only (no receiver)', async () => {
      const resetVolume = vi.fn()
      const { changeInput } = useInputSwitcher(masterBedroom, resetVolume)

      await changeInput(null)

      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.25:8080/tv/actions',
        { command: 'PowerOff' }
      )
      expect(axios.put).not.toHaveBeenCalled()
    })
  })

  describe('Master Bedroom - TV input', () => {
    it('powers on TV, switches to InputTV after delay', async () => {
      const resetVolume = vi.fn()
      const { changeInput } = useInputSwitcher(masterBedroom, resetVolume)

      await changeInput('TV')

      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.25:8080/tv/actions',
        { command: 'PowerOn' }
      )
      vi.advanceTimersByTime(500)
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.25:8080/tv/actions',
        { command: 'InputTV' }
      )
      expect(axios.put).not.toHaveBeenCalled()
    })
  })

  describe('Master Bedroom - PS2 input', () => {
    it('powers on TV, switches to InputAV1 after delay', async () => {
      const resetVolume = vi.fn()
      const { changeInput } = useInputSwitcher(masterBedroom, resetVolume)

      await changeInput('PS2')

      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.25:8080/tv/actions',
        { command: 'PowerOn' }
      )
      vi.advanceTimersByTime(500)
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.25:8080/tv/actions',
        { command: 'InputAV1' }
      )
    })
  })

  describe('Master Bedroom - WII input', () => {
    it('powers on TV, switches to InputComponent1 after delay', async () => {
      const resetVolume = vi.fn()
      const { changeInput } = useInputSwitcher(masterBedroom, resetVolume)

      await changeInput('WII')

      vi.advanceTimersByTime(500)
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.25:8080/tv/actions',
        { command: 'InputComponent1' }
      )
    })
  })

  describe('Master Bedroom - Switch input', () => {
    it('powers on TV, switches to HDMI2 after delay', async () => {
      const resetVolume = vi.fn()
      const { changeInput } = useInputSwitcher(masterBedroom, resetVolume)

      await changeInput('Switch')

      vi.advanceTimersByTime(500)
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.25:8080/tv/actions',
        { command: 'HDMI2' }
      )
    })
  })

  describe('Master Bedroom - Quick Launch', () => {
    it('launches Netflix without receiver', async () => {
      const resetVolume = vi.fn()
      const { quickLaunch } = useInputSwitcher(masterBedroom, resetVolume)

      await quickLaunch({ display: 'Netflix', rokuAppName: 'Netflix' })

      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.222:8080/systems/master-bedroom/actions',
        { command: 'input', value: 'Netflix' }
      )
      expect(axios.post).toHaveBeenCalledWith(
        'http://192.168.72.25:8080/tv/actions',
        { command: 'PowerOn' }
      )
      expect(axios.put).not.toHaveBeenCalled()
    })
  })
})
