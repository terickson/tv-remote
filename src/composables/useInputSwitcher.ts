import { ref } from 'vue'
import axios from 'axios'
import type { RoomConfig, QuickLaunchConfig } from '@/config/types'

export function useInputSwitcher(room: RoomConfig, onVolumeReset: () => void) {
  const currentInput = ref<string | null>(null)
  const rokuSystemPath = room.id === 'family-room'
    ? '/systems/family-room/actions'
    : '/systems/master-bedroom/actions'

  async function postTv(command: string, value?: string | null) {
    const body: Record<string, string> = { command }
    if (value) {
      body.value = value
    }
    await axios.post(`${room.tvHost}/tv/actions`, body)
  }

  async function postRoku(command: string, value?: string | null) {
    const body: Record<string, string> = { command }
    if (value) {
      body.value = value
    }
    await axios.post(`${room.rokuHost}${rokuSystemPath}`, body)
  }

  async function putReceiver(payload: Record<string, unknown>) {
    if (room.receiverHost) {
      await axios.put(`${room.receiverHost}/receiver/`, payload)
    }
  }

  async function changeInput(inputValue: string | null) {
    currentInput.value = inputValue
    onVolumeReset()

    // Off - power down
    if (inputValue === null) {
      postTv('PowerOff')
      if (room.receiverHost) {
        putReceiver({ on: false, volume: room.volume.defaultVolume })
      }
      return
    }

    // Find the input config
    const inputConfig = room.inputs.find(i => i.value === inputValue)
    if (!inputConfig) return

    // Set receiver if this room has one
    if (room.receiverHost && inputConfig.receiverInput) {
      putReceiver({
        on: true,
        volume: room.volume.defaultVolume,
        input: inputConfig.receiverInput,
      })
    }

    // Power on TV
    postTv('PowerOn')

    // Set TV input after delay
    if (inputConfig.tvInput) {
      setTimeout(() => {
        postTv(inputConfig.tvInput!)
      }, 500)
    }
  }

  async function quickLaunch(qLaunch: QuickLaunchConfig) {
    currentInput.value = 'Roku'
    onVolumeReset()

    // Set receiver to Roku input if room has receiver
    if (room.receiverHost) {
      const rokuInput = room.inputs.find(i => i.value === 'Roku')
      putReceiver({
        on: true,
        volume: room.volume.defaultVolume,
        input: rokuInput?.receiverInput ?? 'HDMI1',
      })
    }

    // Launch the Roku app
    postRoku('input', qLaunch.rokuAppName)

    // Power on TV and switch to Roku's HDMI
    postTv('PowerOn')
    const rokuInput = room.inputs.find(i => i.value === 'Roku')
    if (rokuInput?.tvInput) {
      setTimeout(() => {
        postTv(rokuInput.tvInput!)
      }, 500)
    }
  }

  return {
    currentInput,
    changeInput,
    quickLaunch,
    rokuSystemPath,
  }
}
