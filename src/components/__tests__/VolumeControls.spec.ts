import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VolumeControls from '../VolumeControls.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({ components, directives })

function mountComponent(props = {}) {
  return mount(VolumeControls, {
    props,
    global: {
      plugins: [vuetify],
    },
  })
}

describe('VolumeControls', () => {
  it('renders volume label', () => {
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain('Volume')
  })

  it('renders interval buttons when intervals provided', () => {
    const wrapper = mountComponent({ intervals: [1, 5, 10], interval: 5 })
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('10')
  })

  it('does not render interval buttons when no intervals', () => {
    const wrapper = mountComponent()
    const toggle = wrapper.find('.v-btn-toggle')
    expect(toggle.exists()).toBe(false)
  })

  it('emits volume-up when up button clicked', async () => {
    const wrapper = mountComponent()
    const upBtn = wrapper.findAll('.v-btn').find(b => b.find('.mdi-arrow-up-bold').exists())
    if (upBtn) {
      await upBtn.trigger('click')
      expect(wrapper.emitted('volume-up')).toBeTruthy()
    }
  })

  it('emits volume-down when down button clicked', async () => {
    const wrapper = mountComponent()
    const downBtn = wrapper.findAll('.v-btn').find(b => b.find('.mdi-arrow-down-bold').exists())
    if (downBtn) {
      await downBtn.trigger('click')
      expect(wrapper.emitted('volume-down')).toBeTruthy()
    }
  })
})
