import { computed } from 'vue'
import { rooms } from '@/config/rooms'
import type { RoomConfig } from '@/config/types'

export function useRoomConfig(roomId: string): RoomConfig {
  const room = computed(() => rooms[roomId])
  if (!room.value) {
    throw new Error(`Unknown room: ${roomId}`)
  }
  return room.value
}
