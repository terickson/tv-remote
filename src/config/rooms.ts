import type { RoomConfig } from './types'
import { sharedQuickLaunches } from './quickLaunches'

const env = import.meta.env

export const familyRoom: RoomConfig = {
  id: 'family-room',
  name: 'Family Room Remote',
  tvHost: env.VITE_FR_TV_HOST,
  rokuHost: env.VITE_FR_ROKU_HOST,
  receiverHost: env.VITE_FR_RECEIVER_HOST,
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
  quickLaunches: sharedQuickLaunches,
  volume: {
    type: 'receiver',
    defaultVolume: -30,
    intervals: [1, 5, 10],
  },
}

export const masterBedroom: RoomConfig = {
  id: 'master-bedroom',
  name: 'Master Bedroom Remote',
  tvHost: env.VITE_MBR_TV_HOST,
  rokuHost: env.VITE_MBR_ROKU_HOST,
  inputs: [
    { display: 'Off', value: null },
    { display: 'TV', value: 'TV', tvInput: 'InputTV' },
    { display: 'Roku', value: 'Roku', tvInput: 'HDMI1' },
    { display: 'PS2', value: 'PS2', tvInput: 'InputAV1' },
    { display: 'WII', value: 'WII', tvInput: 'InputComponent1' },
    { display: 'Switch', value: 'Switch', tvInput: 'HDMI2' },
  ],
  quickLaunches: sharedQuickLaunches,
  volume: {
    type: 'tv',
    defaultVolume: 0,
  },
}

export const rooms: Record<string, RoomConfig> = {
  'family-room': familyRoom,
  'master-bedroom': masterBedroom,
}
