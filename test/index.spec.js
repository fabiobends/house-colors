import { mount } from '@vue/test-utils'
import HomePage from '@/pages/index.vue'

describe('HomePage', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.vm).toBeTruthy()
  })
})
