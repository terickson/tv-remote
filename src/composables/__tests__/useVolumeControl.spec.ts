import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { useVolumeControl } from '../useVolumeControl'
import type { RoomConfig } from '@/config/types'

vi.mock('axios')

describe('useVolumeControl', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('receiver volume (Family Room)', () => {
    const room: RoomConfig = {
      id: 'family-room',
      name: 'Family Room Remote',
      tvHost: 'http://192.168.72.20:8080',
      rokuHost: 'http://192.168.72.91:8080',
      receiverHost: 'http://192.168.72.91:8081',
      inputs: [],
      quickLaunches: [],
      volume: { type: 'receiver', defaultVolume: -30, intervals: [1, 5, 10] },
    }

    it('initializes with default volume and interval', () => {
      const ctrl = useVolumeControl(room)
      expect(ctrl.volume.value).toBe(-30)
      expect(ctrl.interval.value).toBe(5)
    })

    it('volumeUp increases volume by interval and sends PUT', async () => {
      const ctrl = useVolumeControl(room)
      await ctrl.volumeUp()
      expect(ctrl.volume.value).toBe(-25)
      expect(axios.put).toHaveBeenCalledWith('http://192.168.72.91:8081/receiver/', { volume: -25 })
    })

    it('volumeDown decreases volume by interval and sends PUT', async () => {
      const ctrl = useVolumeControl(room)
      await ctrl.volumeDown()
      expect(ctrl.volume.value).toBe(-35)
      expect(axios.put).toHaveBeenCalledWith('http://192.168.72.91:8081/receiver/', { volume: -35 })
    })

    it('respects changed interval', async () => {
      const ctrl = useVolumeControl(room)
      ctrl.interval.value = 10
      await ctrl.volumeUp()
      expect(ctrl.volume.value).toBe(-20)
      expect(axios.put).toHaveBeenCalledWith('http://192.168.72.91:8081/receiver/', { volume: -20 })
    })

    it('resetVolume resets to default', () => {
      const ctrl = useVolumeControl(room)
      ctrl.volume.value = -10
      ctrl.resetVolume()
      expect(ctrl.volume.value).toBe(-30)
    })
  })

  describe('TV volume (Master Bedroom)', () => {
    const room: RoomConfig = {
      id: 'master-bedroom',
      name: 'Master Bedroom Remote',
      tvHost: 'http://192.168.72.25:8080',
      rokuHost: 'http://192.168.72.91:8080',
      inputs: [],
      quickLaunches: [],
      volume: { type: 'tv', defaultVolume: 0 },
    }

    it('volumeUp sends VolumeUp POST to TV', async () => {
      const ctrl = useVolumeControl(room)
      await ctrl.volumeUp()
      expect(axios.post).toHaveBeenCalledWith('http://192.168.72.25:8080/tv/actions', {
        command: 'VolumeUp',
      })
    })

    it('volumeDown sends VolumeDown POST to TV', async () => {
      const ctrl = useVolumeControl(room)
      await ctrl.volumeDown()
      expect(axios.post).toHaveBeenCalledWith('http://192.168.72.25:8080/tv/actions', {
        command: 'VolumeDown',
      })
    })
  })
})
