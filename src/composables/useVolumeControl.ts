import { ref } from 'vue'
import axios from 'axios'
import type { RoomConfig } from '@/config/types'

export function useVolumeControl(room: RoomConfig) {
  const volume = ref(room.volume.defaultVolume)
  const interval = ref(room.volume.intervals?.[1] ?? 1)

  function resetVolume() {
    volume.value = room.volume.defaultVolume
  }

  async function volumeUp() {
    if (room.volume.type === 'receiver' && room.receiverHost) {
      volume.value = volume.value + interval.value
      await axios.put(`${room.receiverHost}/receiver/`, { volume: volume.value })
    } else {
      const body = { command: 'VolumeUp' }
      await axios.post(`${room.tvHost}/tv/actions`, body)
    }
  }

  async function volumeDown() {
    if (room.volume.type === 'receiver' && room.receiverHost) {
      volume.value = volume.value - interval.value
      await axios.put(`${room.receiverHost}/receiver/`, { volume: volume.value })
    } else {
      const body = { command: 'VolumeDown' }
      await axios.post(`${room.tvHost}/tv/actions`, body)
    }
  }

  return {
    volume,
    interval,
    resetVolume,
    volumeUp,
    volumeDown,
  }
}
