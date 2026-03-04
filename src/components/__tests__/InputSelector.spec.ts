import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputSelector from '../InputSelector.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({ components, directives })

const inputs = [
  { display: 'Off', value: null },
  { display: 'TV', value: 'TV', tvInput: 'InputTV' },
  { display: 'Roku', value: 'Roku', tvInput: 'HDMI1' },
]

function mountComponent(props = {}) {
  return mount(InputSelector, {
    props: {
      modelValue: null,
      items: inputs,
      ...props,
    },
    global: {
      plugins: [vuetify],
    },
  })
}

describe('InputSelector', () => {
  it('renders v-select with Input label', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.v-select').exists()).toBe(true)
  })

  it('shows current input display as chip when selected', () => {
    const wrapper = mountComponent({ modelValue: 'TV' })
    expect(wrapper.find('.v-chip').text()).toContain('TV')
  })

  it('does not show chip when no input selected', () => {
    const wrapper = mountComponent({ modelValue: null })
    expect(wrapper.find('.v-chip').exists()).toBe(false)
  })

  it('has quick-launch slot', () => {
    const wrapper = mount(InputSelector, {
      props: { modelValue: null, items: inputs },
      slots: {
        'quick-launch': '<button class="test-slot">Quick</button>',
      },
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper.find('.test-slot').exists()).toBe(true)
  })
})
