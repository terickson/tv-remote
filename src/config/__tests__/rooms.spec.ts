import { describe, it, expect } from 'vitest'
import { rooms } from '../rooms'

describe('Room configurations', () => {
  it('has family-room and master-bedroom rooms', () => {
    expect(rooms['family-room']).toBeDefined()
    expect(rooms['master-bedroom']).toBeDefined()
  })

  Object.entries(rooms).forEach(([roomId, room]) => {
    describe(roomId, () => {
      it('has valid tvHost', () => {
        expect(room.tvHost).toMatch(/^http:\/\//)
      })

      it('has valid rokuHost', () => {
        expect(room.rokuHost).toMatch(/^http:\/\//)
      })

      it('has an Off input with null value', () => {
        const off = room.inputs.find(i => i.display === 'Off')
        expect(off).toBeDefined()
        expect(off!.value).toBeNull()
      })

      it('has at least one quick launch', () => {
        expect(room.quickLaunches.length).toBeGreaterThan(0)
      })

      it('has volume config', () => {
        expect(['receiver', 'tv']).toContain(room.volume.type)
      })

      it('all inputs with values have tvInput defined', () => {
        room.inputs.filter(i => i.value !== null).forEach(input => {
          expect(input.tvInput).toBeDefined()
        })
      })
    })
  })

  it('family room has receiverHost', () => {
    expect(rooms['family-room'].receiverHost).toMatch(/^http:\/\//)
  })

  it('family room inputs have receiverInput', () => {
    const fr = rooms['family-room']
    fr.inputs.filter(i => i.value !== null).forEach(input => {
      expect(input.receiverInput).toBeDefined()
    })
  })

  it('master bedroom has no receiverHost', () => {
    expect(rooms['master-bedroom'].receiverHost).toBeUndefined()
  })
})
