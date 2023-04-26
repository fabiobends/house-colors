import { Inject } from '@nuxt/types/app'

export default (_: any, inject: Inject) => {
  inject('getRandomColor', getRandomColor)
}

export const getRandomColor = (): string =>
  Math.floor(Math.random() * 2 ** 24)
    .toString(16)
    .padStart(6, '0')
