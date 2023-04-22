import { LoginParams } from './index'

declare module 'vue/types/vue' {
  interface Vue {
    $login: (params: LoginParams) => void
  }
}
