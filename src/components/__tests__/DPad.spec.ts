import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DPad from '../DPad.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({ components, directives })

function mountDPad(props = {}) {
  return mount(DPad, {
    props,
    global: {
      plugins: [vuetify],
    },
  })
}

describe('DPad', () => {
  it('renders 5 buttons', () => {
    const wrapper = mountDPad()
    expect(wrapper.findAll('.v-btn')).toHaveLength(5)
  })

  it('emits up when up button clicked', async () => {
    const wrapper = mountDPad()
    await wrapper.find('.dpad-up').trigger('click')
    expect(wrapper.emitted('up')).toBeTruthy()
  })

  it('emits down when down button clicked', async () => {
    const wrapper = mountDPad()
    await wrapper.find('.dpad-down').trigger('click')
    expect(wrapper.emitted('down')).toBeTruthy()
  })

  it('emits left when left button clicked', async () => {
    const wrapper = mountDPad()
    await wrapper.find('.dpad-left').trigger('click')
    expect(wrapper.emitted('left')).toBeTruthy()
  })

  it('emits right when right button clicked', async () => {
    const wrapper = mountDPad()
    await wrapper.find('.dpad-right').trigger('click')
    expect(wrapper.emitted('right')).toBeTruthy()
  })

  it('emits select when center button clicked', async () => {
    const wrapper = mountDPad()
    await wrapper.find('.dpad-center').trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
  })

  it('displays custom center label', () => {
    const wrapper = mountDPad({ centerLabel: 'OK' })
    expect(wrapper.find('.dpad-center').text()).toContain('OK')
  })

  it('defaults center label to Enter', () => {
    const wrapper = mountDPad()
    expect(wrapper.find('.dpad-center').text()).toContain('Enter')
  })
})
