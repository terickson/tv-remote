export interface InputConfig {
  display: string
  value: string | null
  receiverInput?: string
  tvInput?: string
  rokuApp?: string
}

export interface QuickLaunchConfig {
  display: string
  rokuAppName: string
}

export type VolumeType = 'receiver' | 'tv'

export interface VolumeConfig {
  type: VolumeType
  defaultVolume: number
  intervals?: number[]
}

export interface RoomConfig {
  id: string
  name: string
  tvHost: string
  rokuHost: string
  receiverHost?: string
  inputs: InputConfig[]
  quickLaunches: QuickLaunchConfig[]
  volume: VolumeConfig
}
