import axios from 'axios'

export function useDeviceApi() {
  async function postAction(host: string, command: string, value?: string | null) {
    const body: Record<string, string> = { command }
    if (value) {
      body.value = value
    }
    await axios.post(`${host}/tv/actions`, body)
  }

  async function postRokuAction(host: string, command: string, value?: string | null) {
    const body: Record<string, string> = { command }
    if (value) {
      body.value = value
    }
    await axios.post(`${host}/systems/{systemId}/actions`, body)
  }

  async function postRokuRoomAction(host: string, roomSystemPath: string, command: string, value?: string | null) {
    const body: Record<string, string> = { command }
    if (value) {
      body.value = value
    }
    await axios.post(`${host}${roomSystemPath}`, body)
  }

  async function putReceiver(host: string, payload: Record<string, unknown>) {
    await axios.put(`${host}/receiver/`, payload)
  }

  return { postAction, postRokuAction, postRokuRoomAction, putReceiver }
}
